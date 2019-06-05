import { Component, OnInit, Input,ChangeDetectionStrategy, OnChanges, ViewChild  } from '@angular/core';
import {NgxChartsModule, PieChartComponent} from "@swimlane/ngx-charts";

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

export class InphPieChartComponent implements OnInit {

  @ViewChild('innerChart') chart: PieChartComponent;
  @Input() single: any[];
  multi: any[];
  onClickAdditionDatas: any [] = [];  

  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {
  }
  
  onSelect(event) {
    console.log(event);
    console.log(event.name);
    console.log(this.onClickAdditionDatas);
    if(this.onClickAdditionDatas != undefined && this.onClickAdditionDatas[event.name] != undefined){
      console.log(this.onClickAdditionDatas[event.name]);
    } else {
      console.log("no additional datas found");
    }
  }
  ngOnInit() {
  }

  updateGraphDatas(datas : any[]){
    this.single = datas;
    this.chart.update();
  }

  setAdditionnalDatas(id : string, val : any){
    this.onClickAdditionDatas[id] = val;
  }
}