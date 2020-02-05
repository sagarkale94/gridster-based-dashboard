import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  chart: am4charts.XYChart;
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
        let chart = am4core.create(this.chartDivId, am4charts.XYChart);
        chart.data = resp;
        chart.fontSize = 10;
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
          if (target.dataItem && target.dataItem.index && 2 == 2) {
            return dy + 25;
          }
          return dy;
        });
        var label = categoryAxis.renderer.labels.template;
        label.wrap = true;
        label.maxWidth = 60;
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "visits";
        series.dataFields.categoryX = "country";
        series.name = "Visits";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
        this.chart = chart;
      }, 1000)
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
