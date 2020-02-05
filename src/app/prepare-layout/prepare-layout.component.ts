import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CompactType, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterPush, GridType } from 'angular-gridster2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prepare-layout',
  templateUrl: './prepare-layout.component.html',
  styleUrls: ['./prepare-layout.component.scss']
})
export class PrepareLayoutComponent implements OnInit {

  mobileQuery: MediaQueryList;
  _mobileQueryListener() { };
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  itemToPush: GridsterItemComponent;
  arrGraph = [
    {
      title: 'Bar'
    },
    {
      title: 'Pie'
    }
  ]
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.options = {
      gridType: GridType.VerticalFixed,
      fixedRowHeight: 200,
      mobileBreakpoint: 750,
      compactType: CompactType.None,
      pushItems: true,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      maxCols: 6,
      enableEmptyCellDrop: true,
      emptyCellDropCallback: this.newWidgetCallback.bind(this),
      // swap:true,
      swapWhileDragging: true,
    };
    

    if ((localStorage.getItem('layout') != null) || (localStorage.getItem('layout') != undefined)) {
      this.dashboard = JSON.parse(localStorage.getItem('layout'));
    } else {
      this.dashboard = [
        { cols: 2, rows: 1, y: 0, x: 0, initCallback: this.initItem.bind(this) },
        { cols: 2, rows: 2, y: 0, x: 2 },
        { cols: 1, rows: 1, y: 0, x: 4 },
        { cols: 3, rows: 2, y: 1, x: 4 },
        { cols: 1, rows: 1, y: 4, x: 5 },
        { cols: 1, rows: 1, y: 2, x: 1 },
        { cols: 2, rows: 2, y: 5, x: 5 },
        { cols: 2, rows: 2, y: 3, x: 2 },
        { cols: 2, rows: 1, y: 2, x: 2 },
        { cols: 1, rows: 1, y: 3, x: 4 },
        { cols: 1, rows: 1, y: 0, x: 6 }
      ];
    }

    // this.options.emptyCellDropCallback = this.newWidgetCallback.bind(this);

  }
  
  newWidgetCallback(event, item){
   this.dashboard.push(item);
 }
 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }

  initItem(item: GridsterItem, itemComponent: GridsterItemComponent) {
    this.itemToPush = itemComponent;
  }

  pushItem() {
    const push = new GridsterPush(this.itemToPush); // init the service
    this.itemToPush.$item.rows += 4; // move/resize your item
    if (push.pushItems(push.fromNorth)) { // push items from a direction
      push.checkPushBack(); // check for items can restore to original position
      push.setPushedItems(); // save the items pushed
      this.itemToPush.setSize();
      this.itemToPush.checkItemChanges(this.itemToPush.$item, this.itemToPush.item);
    } else {
      this.itemToPush.$item.rows -= 4;
      push.restoreItems(); // restore to initial state the pushed items
    }
    push.destroy(); // destroy push instance
    // similar for GridsterPushResize and GridsterSwap
  }

  showFinalLayout() {
    localStorage.setItem('layout', JSON.stringify(this.dashboard))
    this.router.navigate(['/final-layout']);
  }

}
