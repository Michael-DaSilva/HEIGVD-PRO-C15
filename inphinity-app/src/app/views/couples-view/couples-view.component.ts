import { Component, OnInit } from '@angular/core';
import {Couple} from '../../models/couple';
import { CoupleComponent } from '../../components/couple/couple.component';
import { AuthService } from '../../services/auth.service';
import { APIDatasService } from '../../services/apidatas.service';

@Component({
  selector: 'app-couples-view',
  templateUrl: './couples-view.component.html',
  styleUrls: ['./couples-view.component.scss']
})
export class CouplesViewComponent implements OnInit {

  constructor(private api: APIDatasService, private authService: AuthService) { }

  ngOnInit() {
    this.fetchDataCouple();
  }

  fetchDataCouple() {
    const Res = this.api.getDatas('/couple/', this.authService.getToken());
    let array: any[];
    Res.subscribe(
      res => {
        array = res as Couple[];
      },
      error => {console.log('Error getting couples'); console.log(error); },
      () => {
        console.log(array);
        // this.coupleComp.setData(array);
      });
  }
}
