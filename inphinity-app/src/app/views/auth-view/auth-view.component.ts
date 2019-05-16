import { Component, OnInit, ViewChild  } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss']
})
export class AuthViewComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  @ViewChild(LoginFormComponent)  loginForm:LoginFormComponent;
  authStatus: boolean;

  ngOnInit() { }

  sendErrorMsg(msg : string){
    this.loginForm.showMessage("Erreur de connexion : " + msg);
  }

  doSignIn(event) {
    console.log(event);
    this.authService.signIn(event, this).catch(e => {this.sendErrorMsg(e);});
    
    if(this.authService.isAuth())
      this.router.navigate(['']);
  }
}
