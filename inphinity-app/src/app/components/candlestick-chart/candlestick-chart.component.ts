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
  @Input() hAxisTitle = '';
  @Input() vAxisTitle = '';

  options = {
    legend: 'none',
    hAxis: {
      title: ''
    },
    vAxis: {
      title: ''
    },
  };

  constructor() {
  }

  ngOnInit() {
    this.options.hAxis.title = this.hAxisTitle;
    this.options.vAxis.title = this.vAxisTitle;
  }

}
