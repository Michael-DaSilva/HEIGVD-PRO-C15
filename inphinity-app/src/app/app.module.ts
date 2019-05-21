import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import {AuthService} from './services/auth.service';
import { AuthViewComponent } from './views/auth-view/auth-view.component';
import { GeneralViewComponent } from './views/general-view/general-view.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'login', component: AuthViewComponent },
  { path: 'log-out', component: AuthViewComponent},
  { path: '', component: GeneralViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    AuthViewComponent,
    GeneralViewComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
