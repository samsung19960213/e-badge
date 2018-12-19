import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedEmployeesComponent } from './deactivated-employees.component';

describe('DeactivatedEmployeesComponent', () => {
  let component: DeactivatedEmployeesComponent;
  let fixture: ComponentFixture<DeactivatedEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
