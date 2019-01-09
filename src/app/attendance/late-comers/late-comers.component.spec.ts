import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LateComersComponent } from './late-comers.component';

describe('LateComersComponent', () => {
  let component: LateComersComponent;
  let fixture: ComponentFixture<LateComersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LateComersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LateComersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
