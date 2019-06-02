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
          this.interChart.updateGraphDatas(this.IntercationsToGraphData(couplesList));
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

  private IntercationsToGraphData(couples : Array<Couple>) : any[]{
    var result = new Array<any>();
    let positive = 0;
    let negative = 0;

    for (var _i = 0; _i < couples.length; _i++){
      if(couples[_i].interaction_type){
        positive++;
      } else {
        negative++;
      }
    }

    result.push({
      name: 'positive',
      value: positive
    });
    result.push({
      name: 'negative',
      value: negative
    });

    return result;
  }
  private FamiliesToGraphData(datas : Array<Family>) : any[]{
    var result = new Array<any>();
    for(var _i = 0; _i < datas.length; _i++){
      result.push(
        {
          name : datas[_i].designation,
          value : datas[_i].genuses.length
        });
    }

    result.sort(function (a, b) {
      return a.value - b.value;
    }).reverse();

    result = this.RegroupFamilies(result);
    return result;
  }

  private RegroupFamilies(datas : Array<any>) : any[]{
    let others = 0;
    let result = [];
    if(datas.length > 4){
      result.push(datas[0]);
      result.push(datas[1]);
      result.push(datas[2]);

      for(let _i = 3; _i < datas.length - 1; _i++){
        others += datas[_i].value;
      }
      result.push({
        name: 'Others',
        value: others
      });
      return result;
    } else {
      return datas;
    }

  }
}
