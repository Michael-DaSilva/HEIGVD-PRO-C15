import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacteriumViewComponent } from './bacterium-view.component';

describe('BacteriumViewComponent', () => {
  let component: BacteriumViewComponent;
  let fixture: ComponentFixture<BacteriumViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacteriumViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacteriumViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
