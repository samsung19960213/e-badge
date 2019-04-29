import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDesignationdialogueComponent } from './delete-designationdialogue.component';

describe('DeleteDesignationdialogueComponent', () => {
  let component: DeleteDesignationdialogueComponent;
  let fixture: ComponentFixture<DeleteDesignationdialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDesignationdialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDesignationdialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
