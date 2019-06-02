import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { CouplesViewComponent } from './views/couples-view/couples-view.component';
import { BacteriumViewComponent } from './views/bacterium-view/bacterium-view.component';
import { BacteriopphageViewComponent } from './views/bacteriopphage-view/bacteriopphage-view.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const appRoutes: Routes = [
  { path: 'login', component: AuthViewComponent },
  { path: 'log-out', component: AuthViewComponent},
  { path: 'couples', component: CouplesViewComponent},
  { path: 'bacterium', component : BacteriumViewComponent},
  { path: 'bacteriophage', component : BacteriopphageViewComponent},
  { path: '', component: GeneralViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    AuthViewComponent,
    GeneralViewComponent,
    LoginFormComponent,
    CouplesViewComponent,
    BacteriumViewComponent,
    BacteriopphageViewComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    NgxGraphModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
