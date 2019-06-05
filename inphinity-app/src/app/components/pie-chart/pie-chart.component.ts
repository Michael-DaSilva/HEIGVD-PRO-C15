import { Component, OnInit, Input,ChangeDetectionStrategy, OnChanges, ViewChild  } from '@angular/core';
import {NgxChartsModule, PieChartComponent} from "@swimlane/ngx-charts";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pie-chart',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #modal let-modal class="pie-modal">
      <div class="modal-header">
        <h4 class="modal-title">{{name}}</h4>
        <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <table>
            <tr *ngFor="let line of onClickAdditionDatas['Others'].value">
                <td style="width : 60%" >{{line.name}}</td>
                <td style="width : 30%" >{{line.value}}</td>
                <td style="width : 10%" ><a href="javascript:void(0)" (click)="onDetails(line.name)"> details</a></td>
            </tr>
          </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-light" (click)="modal.close('Close click')">Close</button>
      </div>
    </ng-template>

    <ngx-charts-pie-chart #innerChart
      [view]="view"
      [scheme]="colorScheme"
      [results]="data"
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
  @ViewChild("modal") modalContent: any;

  @Input() data: any[];
  @Input() onSelectcallback : any;
  @Input() name : string;
  @Input() view: any[];

  multi: any[];
  onClickAdditionDatas: any [] = [];  

  

  // options
  showLegend = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#81A7F5']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor( private modalService: NgbModal) {
  }
  
  onSelect(event) {
    console.log(event);
    console.log(event.name);
    console.log(this.onClickAdditionDatas);
    if(this.onClickAdditionDatas != undefined && this.onClickAdditionDatas[event.name] != undefined){
      console.log(this.onClickAdditionDatas[event.name]);
      if (this.onClickAdditionDatas[event.name].popup)
          this.modalService.open(this.modalContent);
    } else {
      console.log("no additional datas found");
    }
  }
  ngOnInit() {
  }

  updateGraphDatas(datas : any[]){
    this.data = datas;
    this.chart.update();
  }

  setAdditionnalDatas(id : string, val : any, popup = false){
    this.onClickAdditionDatas[id] ={
      value : val,
      popup : popup
    };
  }
}