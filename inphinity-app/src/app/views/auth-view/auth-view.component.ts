import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoginFormComponent} from 'src/app/components/login-form/login-form.component';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss']
})
export class AuthViewComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  @ViewChild(LoginFormComponent) loginForm: LoginFormComponent;

  ngOnInit() {
  }
  /**
   * author : R. Fournier
   * goal   : Send a error message to the user
   *
   * parameters : msg: message to show to the user
   */
  sendErrorMsg(msg: string) {
    this.loginForm.showMessage('Erreur de connexion : ' + msg);
  }
  /**
   * author : R. Fournier
   * goal   : Call the functions to sign in the user
   *
   * parameters : event: object with the username and the password
   */
  doSignIn(event) {
    this.authService.signIn(event, this).catch(e => {
      this.sendErrorMsg(e);
    })
      .then(res => {
        if (typeof (res) !== 'undefined') {
          //successful login
          this.authService.setAuth(true);
          this.authService.setToken(res);
        }

        // We redirect to / if the user is authenticated
        if (this.authService.isAuth()) {
          this.router.navigate(['']);
        }
      });
  }
}
