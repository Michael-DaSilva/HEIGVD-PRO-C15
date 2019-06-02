import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouplesViewComponent } from './couples-view.component';

describe('CouplesViewComponent', () => {
  let component: CouplesViewComponent;
  let fixture: ComponentFixture<CouplesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouplesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouplesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
