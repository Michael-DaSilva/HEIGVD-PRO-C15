import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'inphinity-app';
  isAuthed: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(res => {
      this.isAuthed = res;
    });
  }
}
