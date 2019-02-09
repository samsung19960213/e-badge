import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutRequestComponent } from './checkout-request.component';

describe('CheckoutRequestComponent', () => {
  let component: CheckoutRequestComponent;
  let fixture: ComponentFixture<CheckoutRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
