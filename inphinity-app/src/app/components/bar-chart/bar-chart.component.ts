import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, ViewChild   } from '@angular/core';
import {NgxChartsModule, BarVerticalComponent} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-bar-chart',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
          <ngx-charts-bar-vertical-2d #innerChart
              [view]="view"
              [scheme]="colorScheme"
              [results]="multi"
              [gradient]="gradient"
              [xAxis]="showXAxis"
              [yAxis]="showYAxis"
              [legend]="showLegend"
              [showXAxisLabel]="showXAxisLabel"
              [showYAxisLabel]="showYAxisLabel"
              [xAxisLabel]="xAxisLabel"
              [yAxisLabel]="yAxisLabel"
              (select)="onSelect($event)">
          </ngx-charts-bar-vertical-2d>
  `
})
export class BarChartComponent implements OnInit {

  @ViewChild('innerChart') chart: BarVerticalComponent;
  @Input() single : any[]
  @Input() multi : any[];

  view: any[];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  constructor() { }

  ngOnInit() {
  }

  updateGraphDatas(datas : any, xAxisName ="", yAxisName = ""){
    this.xAxisLabel = xAxisName;
    this.yAxisLabel = yAxisName;
    this.multi = datas;
    this.chart.update();
  }
}
