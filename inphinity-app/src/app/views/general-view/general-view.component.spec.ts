import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralViewComponent } from './general-view.component';

describe('GeneralViewComponent', () => {
  let component: GeneralViewComponent;
  let fixture: ComponentFixture<GeneralViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
