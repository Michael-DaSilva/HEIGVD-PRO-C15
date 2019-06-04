import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, ViewChild  } from '@angular/core';
import {NgxChartsModule, PieChartComponent} from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';
import {single, multi} from './data';

@Component({
  selector: 'app-pie-chart',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ngx-charts-pie-chart #innerChart
      [view]="view"
      [scheme]="colorScheme"
      [results]="single"
      [legend]="showLegend"
      [explodeSlices]="explodeSlices"
      [labels]="showLabels"
      [doughnut]="doughnut"
      [gradient]="gradient"
      (select)="onSelect($event)">
    </ngx-charts-pie-chart>
  `
})

export class InphPieChartComponent implements OnInit, OnChanges {

  @ViewChild('innerChart') chart: PieChartComponent;
  @Input() single: any[];
  multi: any[];

  view: any[] = [700, 400];
  gradient = false;

  // options
  showLegend = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {}

  onSelect(event) {
    console.log(event);
  }
  ngOnInit() {
  }
  updateGraphDatas(datas: any[]) {
    this.single = datas;
    this.chart.update();
  }

  ngOnChanges() {
    console.log('changed');
  }
}
