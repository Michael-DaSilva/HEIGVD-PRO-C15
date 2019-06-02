import { Component, OnInit, ViewChild  } from '@angular/core';
import {APIDatasService} from '../../services/apidatas.service';
import {AuthService} from '../../services/auth.service';
import { Family } from 'src/app/models/family';
import { Couple } from 'src/app/models/couple';
import { Interaction } from 'src/app/models/interaction';
import { InphPieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})

export class GeneralViewComponent implements OnInit {
  @ViewChild('familiesChart') famChart: InphPieChartComponent;
  @ViewChild('interactionsChart') interChart: InphPieChartComponent;

  constructor(private api : APIDatasService, private authService: AuthService) { }

  ngOnInit() {
    this.fetchFamilyDatas();
    this.fetchInteractionsData();
  }
  

  fetchInteractionsData(){
    let coupleRes = this.api.getDatas('/couple/', this.authService.getToken());
    let interactionsRes = this.api.getDatas('/intervalidity/', this.authService.getToken());

    let couplesList : Couple[], interactionsTypes : Interaction[];

    if(typeof(coupleRes) !== 'undefined' && typeof(interactionsRes) !== 'undefined'){
      coupleRes.subscribe( 
        res     =>{couplesList = res as Couple[]},
        error   =>{console.log("Error getting couples");console.log(error)},
        ()      => {
          interactionsRes.subscribe( 
            res     =>{interactionsTypes = res as Interaction[]},
            error   =>{console.log("Error getting interactions" + error);},
            ()      => {
              console.log("Calculating interactions");
              this.interChart.updateGraphDatas(this.IntercationsToGraphData(couplesList, interactionsTypes));
            });
        });
    }

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

  private IntercationsToGraphData(couples : Array<Couple>, possibleInteractions : Interaction[]) : any[]{
    var result = new Array<any>();
    for(var _i = 0; _i < possibleInteractions.length; _i++){
      result.push(
            {
              "name" : possibleInteractions[_i].designation,
              "value" : 0
            })
    }

    for(var _i = 0; _i < couples.length; _i++){
        (result[couples[_i].level]).value += 1;
    }

    return result;
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
