import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacteriopphageViewComponent } from './bacteriopphage-view.component';

describe('BacteriopphageViewComponent', () => {
  let component: BacteriopphageViewComponent;
  let fixture: ComponentFixture<BacteriopphageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacteriopphageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacteriopphageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
