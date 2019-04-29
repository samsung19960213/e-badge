import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShiftDialogueComponent } from './delete-shift-dialogue.component';

describe('DeleteShiftDialogueComponent', () => {
  let component: DeleteShiftDialogueComponent;
  let fixture: ComponentFixture<DeleteShiftDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteShiftDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteShiftDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
