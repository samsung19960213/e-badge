import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraph1Component } from './bar-graph1.component';

describe('BarGraph1Component', () => {
  let component: BarGraph1Component;
  let fixture: ComponentFixture<BarGraph1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarGraph1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarGraph1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
