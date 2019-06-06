import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderMenuComponent} from './components/header-menu/header-menu.component';
import {AuthService} from './services/auth.service';
import {AuthViewComponent} from './views/auth-view/auth-view.component';
import {GeneralViewComponent} from './views/general-view/general-view.component';
import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CouplesViewComponent} from './views/couples-view/couples-view.component';
import {BacteriumViewComponent} from './views/bacterium-view/bacterium-view.component';
import {BacteriophageViewComponent} from './views/bacteriophage-view/bacteriophage-view.component';
import {InphPieChartComponent} from './components/pie-chart/pie-chart.component';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AuthGuard} from './services/auth-guard.service';
import {BarChartComponent} from './components/bar-chart/bar-chart.component';
import {GoogleChartsModule} from 'angular-google-charts';
import { CandlestickChartComponent } from './components/candlestick-chart/candlestick-chart.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';


const appRoutes: Routes = [
  {path: 'login', component: AuthViewComponent},
  {path: 'log-out', component: AuthViewComponent},
  {path: 'couples', component: CouplesViewComponent, canActivate: [AuthGuard]},
  {path: 'bacterium', component: BacteriumViewComponent, canActivate: [AuthGuard]},
  {path: 'bacteriophage', component: BacteriophageViewComponent, canActivate: [AuthGuard]},
  {path: '', component: GeneralViewComponent, canActivate: [AuthGuard]}
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
    BacteriophageViewComponent,
    InphPieChartComponent,
    BarChartComponent,
    CandlestickChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    GoogleChartsModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    NgxGraphModule,
    NgbModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
