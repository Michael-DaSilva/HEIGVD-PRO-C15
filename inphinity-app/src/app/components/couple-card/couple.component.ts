import {Component, Input, OnInit} from '@angular/core';
import {Couple} from '../../models/couple';

@Component({
  selector: 'app-couple',
  templateUrl: './couple.component.html',
  styleUrls: ['./couple.component.scss']
})
export class CoupleComponent implements OnInit {
  @Input() data: Couple[] = [];

  constructor() {
  }

  ngOnInit() {
  }
}
