import { Component, OnInit, ViewChild  } from '@angular/core';
import {APIDatasService} from '../../services/apidatas.service';
import {AuthService} from '../../services/auth.service';
import { Family } from 'src/app/models/family';
import { InphPieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})

export class GeneralViewComponent implements OnInit {
  @ViewChild('familiesChart') famChart: InphPieChartComponent;

  constructor(private api : APIDatasService, private authService: AuthService) { }

  ngOnInit() {
    this.fetchFamilyDatas();
  }
  

  private fetchFamilyDatas(){
    let res = this.api.getDatas('/family/', this.authService.getToken());
    let array : Array<Family>;
    
    if(typeof(res) !== 'undefined' ){
      res.subscribe( 
        res     =>{array = res as any[]},
        error   =>{console.log("Error getting values" + error);},
        ()      => {this.famChart.updateGraphDatas(this.FamiliesToGraphData(array));}
        );
    }
  }

  private FamiliesToGraphData(datas : Array<Family>) : any[]{
    var result = new Array<any>();
    for(var _i = 0; _i < datas.length; _i++){
      result.push(
            {
              "name" : datas[_i].designation,
              "value" : datas[_i].genuses.length
            })
    }
    return result;
  }
}
