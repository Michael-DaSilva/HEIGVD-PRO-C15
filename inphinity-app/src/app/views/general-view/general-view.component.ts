import { Component, OnInit } from '@angular/core';
import {APIDatasService} from '../../services/apidatas.service';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

  constructor(private api : APIDatasService, private authService: AuthService) { }

  ngOnInit() {
    this.api.getDatas('/family/', this.authService.getToken() ).catch(e => {console.log("Error getting")})
    .then( res => {
      if(typeof(res) !== 'undefined' ){
        //successful request
        console.log(res);
      }
    });
  }

}
