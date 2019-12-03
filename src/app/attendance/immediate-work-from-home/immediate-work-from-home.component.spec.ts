import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmediateWorkFromHomeComponent } from './immediate-work-from-home.component';

describe('ImmediateWorkFromHomeComponent', () => {
  let component: ImmediateWorkFromHomeComponent;
  let fixture: ComponentFixture<ImmediateWorkFromHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmediateWorkFromHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmediateWorkFromHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
