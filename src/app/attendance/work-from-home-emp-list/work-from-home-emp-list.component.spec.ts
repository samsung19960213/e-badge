import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFromHomeEmpListComponent } from './work-from-home-emp-list.component';

describe('WorkFromHomeEmpListComponent', () => {
  let component: WorkFromHomeEmpListComponent;
  let fixture: ComponentFixture<WorkFromHomeEmpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFromHomeEmpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFromHomeEmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
