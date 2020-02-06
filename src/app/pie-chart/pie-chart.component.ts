import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('chartPieElement', { static: false }) chartPieElement: ElementRef<HTMLElement>;

  constructor(
    private zone: NgZone,
    private dataShareService: DataShareService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.zone.runOutsideAngular(() => {
      let chart = am4core.create(this.chartPieElement.nativeElement, am4charts.PieChart);
        chart.data = [];
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "visits";
        pieSeries.dataFields.category = "country";
        this.chart = chart;
    });

    this.dataShareService.getGraphData().subscribe(resp => {
      if(this.chart){
        this.chart.data = resp;   
      }
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
