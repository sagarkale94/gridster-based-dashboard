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
      chart.responsive.enabled = true;
      chart.responsive.rules.push({
        relevant: function (target) {
          if (target.pixelWidth <= 200) {
            return true;
          }
          return false;
        },
        state: function (target, stateId) {
          if (target instanceof am4charts.PieSeries) {
            var state = target.states.create(stateId);

            var labelState = target.labels.template.states.create(stateId);
            labelState.properties.disabled = true;

            var tickState = target.ticks.template.states.create(stateId);
            tickState.properties.disabled = true;
            return state;
          }

          return null;
        }
      });
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "visits";
      pieSeries.dataFields.category = "country";
      pieSeries.radius = am4core.percent(50);
      // pieSeries.ticks.template.disabled = true;
      // pieSeries.alignLabels = false;
      // pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
      // pieSeries.labels.template.radius = am4core.percent(-40);
      // pieSeries.labels.template.fill = am4core.color("white");
      this.chart = chart;
    });

    this.dataShareService.getGraphData().subscribe(resp => {
      if (this.chart) {
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
