import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieCHartComponent implements OnInit {

  chart: am4charts.PieChart;
  chartDivId = 'chart' + (Math.floor(Math.random() * 90 + 10) + Math.floor(Math.random() * 90 + 10));

  constructor(
    private zone: NgZone,
    private dataShareService: DataShareService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataShareService.getGraphData().subscribe(resp => {
      setTimeout(() => {
        let chart = am4core.create(this.chartDivId, am4charts.PieChart);
        chart.data = resp;
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "visits";
        pieSeries.dataFields.category = "country";
        this.chart = chart;
      }, 100)
    });
  }

  getChartDivId() {
    return this.chartDivId;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
