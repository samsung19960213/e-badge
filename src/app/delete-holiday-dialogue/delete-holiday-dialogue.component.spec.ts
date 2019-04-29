import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHolidayDialogueComponent } from './delete-holiday-dialogue.component';

describe('DeleteHolidayDialogueComponent', () => {
  let component: DeleteHolidayDialogueComponent;
  let fixture: ComponentFixture<DeleteHolidayDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteHolidayDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHolidayDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
