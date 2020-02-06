import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CompactType, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterPush, GridType } from 'angular-gridster2';

@Component({
  selector: 'app-final-layout',
  templateUrl: './final-layout.component.html',
  styleUrls: ['./final-layout.component.scss']
})
export class FinalLayoutComponent implements OnInit {

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  itemToPush: GridsterItemComponent;

  constructor() { }

  ngOnInit() {
    this.options = {
      gridType: GridType.VerticalFixed,
      fixedRowHeight: 200,
      mobileBreakpoint: 770,
      compactType: CompactType.None,
      pushItems: false,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      },
      maxCols: 6,
      minCols: 6
    };

    this.dashboard = JSON.parse(localStorage.getItem('layout'));

  }

}
