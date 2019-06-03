import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  username: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  signOut() {
    this.authService.signOut();
  }
}
