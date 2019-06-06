import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupleComponent } from './couple.component';

describe('CoupleComponent', () => {
  let component: CoupleComponent;
  let fixture: ComponentFixture<CoupleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoupleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
