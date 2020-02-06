import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CompactType, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterPush, GridType, DisplayGrid } from 'angular-gridster2';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
      title: 'Bar',
      image: 'assets/images/bar.png'
    },
    {
      title: 'Pie',
      image: 'assets/images/pie.png'
    },
    {
      title: 'Guage',
      image: 'assets/images/guage.png'
    }
  ];
  graphTypeRecentlyDragged: string;


  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openSnackBar() {
    this._snackBar.open('Sorry, Nothing to preview..!!','', {
      duration: 2000,
    });
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
      minCols: 6,
      enableEmptyCellDrop: true,
      emptyCellDropCallback: this.newWidgetCallback.bind(this),
      // swap:true,
      swapWhileDragging: true,
      displayGrid: DisplayGrid.Always,
    };

    if ((localStorage.getItem('layout') != null) || (localStorage.getItem('layout') != undefined)) {
      this.dashboard = JSON.parse(localStorage.getItem('layout'));
    } else {
      this.dashboard = [];
    }

  }

  newWidgetCallback(event, item) {

    item.type = this.graphTypeRecentlyDragged;

    switch (this.graphTypeRecentlyDragged) {
      case 'Bar':
        item.image = 'assets/images/bar.png'
        break;
      case 'Pie':
        item.image = 'assets/images/pie.png'
        break;
      case 'Guage':
        item.image = 'assets/images/guage.png'
        break;
    }

    this.dashboard.push(item);

  }

  drggedGraph(graphTitle) {
    this.graphTypeRecentlyDragged = graphTitle
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
    if(this.dashboard.length>0){
      localStorage.setItem('layout', JSON.stringify(this.dashboard));
      this.router.navigate(['/final-layout']);
    }else{
      this.openSnackBar();
    }
  }

  resetLayout(){
    localStorage.clear();
    this.dashboard = [];
  }

}
