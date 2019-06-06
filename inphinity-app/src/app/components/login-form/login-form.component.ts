import { Component, OnInit, Output, EventEmitter   } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor() { }
  msgToShow : string;

  ngOnInit() {
  }
  /**
   * author : R. Fournier
   * goal   : Submit the login form to the API for login
   *
   * parameters : form: the form containing the username and the password
   */
  submitLogin(form){
    this.submitComplete(form)
    form.reset();
  }
  /**
   * author : R. Fournier
   * goal   : Show a message to the user (error)
   *
   * parameters : signal: the message to print
   */
  showMessage(signal : any){
    this.msgToShow = signal;
  }

  @Output()
  formResponse = new EventEmitter<any>();
  /**
   * author : R. Fournier
   * goal   : Create the bar chart with the givin data
   *
   * parameters : datas : Array of datas to use in the chart
   *              xAxisName: name of the x axis in the bar chart
   *              yAxisName: name of the y axis in the bar chart
   */
  submitComplete(form) {
    this.formResponse.emit(form.value);
  }

}
