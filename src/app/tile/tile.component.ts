import { Component, OnInit, Input } from '@angular/core';
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input()  graphType;
  
  arrVisualType = [
    {
      value: 0,
      viewValue: 'Bar Chart'
    },
    {
      value: 1,
      viewValue: 'Pie Chart'
    },
    {
      value: 2,
      viewValue: 'Guage Chart'
    }
  ];

  visualType = 0;

  graphData = [{
    "country": "USA",
    "visits": 2025
  }, {
    "country": "China",
    "visits": 1882
  }, {
    "country": "Japan",
    "visits": 1809
  }, {
    "country": "Germany",
    "visits": 1322
  }, {
    "country": "UK",
    "visits": 1122
  }, {
    "country": "France",
    "visits": 1114
  }, {
    "country": "India",
    "visits": 984
  }, {
    "country": "Spain",
    "visits": 711
  }, {
    "country": "Netherlands",
    "visits": 665
  }, {
    "country": "Russia",
    "visits": 580
  }, {
    "country": "South Korea",
    "visits": 443
  }, {
    "country": "Canada",
    "visits": 441
  }, {
    "country": "Brazil",
    "visits": 395
  }];

  constructor(
    private dataShareService : DataShareService
  ) { }

  ngOnInit() {
     switch (this.graphType) {
      case 'Bar':
        this.visualType = 0;
        break;
      case 'Pie':
        this.visualType = 1;
        break;
      case 'Guage':
        this.visualType = 2;
        break;
    }
    this.dataShareService.setGraphData(this.graphData);
  }

  changeVisualType(value) {
    this.visualType = value;
  }

}
