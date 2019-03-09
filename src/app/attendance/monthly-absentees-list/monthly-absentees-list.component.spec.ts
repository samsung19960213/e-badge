import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAbsenteesListComponent } from './monthly-absentees-list.component';

describe('MonthlyAbsenteesListComponent', () => {
  let component: MonthlyAbsenteesListComponent;
  let fixture: ComponentFixture<MonthlyAbsenteesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyAbsenteesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyAbsenteesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
