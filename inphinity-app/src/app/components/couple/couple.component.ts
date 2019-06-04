import { Component, OnInit } from '@angular/core';
import { Couple } from '../../models/couple';

@Component({
  selector: 'app-couple',
  templateUrl: './couple.component.html',
  styleUrls: ['./couple.component.scss']
})
export class CoupleComponent implements OnInit {
  data: Couple[];

  constructor() { }

  ngOnInit() {
  }

  setData(data: Couple[]) {
    this.data = data;
  }

  getData(): Couple[] {
    return this.data;
  }
}
