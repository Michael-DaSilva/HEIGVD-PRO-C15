import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss']
})
export class AuthViewComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  authStatus: boolean;

  ngOnInit() { }

  doSignIn(event) {
    console.log(event);
    this.authService.signIn(event);
  }
}
