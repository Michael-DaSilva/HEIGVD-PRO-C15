import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  styleUrls: ['./candlestick-chart.component.scss']
})
export class CandlestickChartComponent implements OnInit {
  @Input() width = 450;
  @Input() height = 500;
  @Input() columnNames: string[];
  @Input() data: Array<string | number>[] = [];
  @Input() title = '';

  constructor() {
  }

  ngOnInit() {
  }

}
