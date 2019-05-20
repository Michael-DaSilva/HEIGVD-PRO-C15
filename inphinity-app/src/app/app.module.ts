import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import {RouterModule, Routes} from '@angular/router';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyDoughnutChartComponent } from './my-doughnut-chart/my-doughnut-chart.component';
import { MyRadarChartComponent } from './my-radar-chart/my-radar-chart.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';


const routes: Routes = [
  {path: 'bar-chart', component: MyBarChartComponent},
  {path: 'doughnut-chart', component: MyDoughnutChartComponent},
  {path: 'radar-chart', component: MyRadarChartComponent},
  {path: 'pie-chart', component: MyPieChartComponent},
  {path: '**', component: MyBarChartComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    MyBarChartComponent,
    MyDoughnutChartComponent,
    MyRadarChartComponent,
    MyPieChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
