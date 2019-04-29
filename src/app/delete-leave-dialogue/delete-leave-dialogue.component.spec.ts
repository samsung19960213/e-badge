import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLeaveDialogueComponent } from './delete-leave-dialogue.component';

describe('DeleteLeaveDialogueComponent', () => {
  let component: DeleteLeaveDialogueComponent;
  let fixture: ComponentFixture<DeleteLeaveDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLeaveDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLeaveDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
