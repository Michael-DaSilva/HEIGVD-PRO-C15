import { Component, OnInit } from '@angular/core';
import {AuthService} from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'inphinity-app';

  constructor(private authService: AuthService, private router: Router){}
  
  ngOnInit(){
    if(!this.authService.isAuth() && window.location.pathname !== '/login'){
      console.log("Not auth -> redirecting to login.");
      this.router.navigate(['login']);
    }

  }
}