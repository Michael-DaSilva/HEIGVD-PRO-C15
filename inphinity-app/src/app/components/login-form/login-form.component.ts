import { Component, OnInit, Output, EventEmitter   } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submitLogin(form){
    console.log(form.value);
    this.submitComplete(form)
    form.reset();
  }

  @Output()
  formResponse = new EventEmitter<any>();

  submitComplete(form) {
    this.formResponse.emit(form.value);
  }

}
