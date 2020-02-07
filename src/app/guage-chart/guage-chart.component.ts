import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-guage-chart',
  templateUrl: './guage-chart.component.html',
  styleUrls: ['./guage-chart.component.scss']
})
export class GuageChartComponent implements OnInit {

  chart: am4charts.GaugeChart;
  chartDivId = 'chart' + (Math.floor(Math.random() * 90 + 10) + Math.floor(Math.random() * 90 + 10));
  @ViewChild('chartGuageElement', { static: false }) chartGuageElement: ElementRef<HTMLElement>

  constructor(
    private zone: NgZone,
    private dataShareService: DataShareService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      let chart = am4core.create(this.chartGuageElement.nativeElement, am4charts.GaugeChart);

      let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis.min = 0;
      axis.max = 100;
      axis.strictMinMax = true;

      chart.innerRadius = -20;
      chart.radius = am4core.percent(70);

      let range = axis.axisRanges.create();
      range.value = 0;
      range.endValue = 100;
      range.axisFill.fillOpacity = 1;
      range.axisFill.fill = am4core.color("#88AB75");
      range.axisFill.zIndex = - 1;

      // let range2 = axis.axisRanges.create();
      // range2.value = 70;
      // range2.endValue = 90;
      // range2.axisFill.fillOpacity = 1;
      // range2.axisFill.fill = am4core.color("#DBD56E");
      // range2.axisFill.zIndex = - 1;

      // let range3 = axis.axisRanges.create();
      // range3.value = 90;
      // range3.endValue = 100;
      // range3.axisFill.fillOpacity = 1;
      // range3.axisFill.fill = am4core.color("#DE8F6E");
      // range3.axisFill.zIndex = - 1;

      let hand = chart.hands.push(new am4charts.ClockHand());
      hand.value = 65;
      hand.pin.disabled = true;
      hand.fill = am4core.color("#2D93AD");
      hand.stroke = am4core.color("#2D93AD");
      hand.innerRadius = am4core.percent(50);
      hand.radius = am4core.percent(80);
      hand.startWidth = 15;

      // hand.showValue(500, 1000, am4core.ease.cubicOut);

    });

    // this.dataShareService.getGraphData().subscribe(resp => {
    //   if (this.chart) {
    //     this.chart.data = resp;
    //   }
    // });

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
