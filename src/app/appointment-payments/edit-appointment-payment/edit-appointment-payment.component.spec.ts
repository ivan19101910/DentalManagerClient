import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentPaymentComponent } from './edit-appointment-payment.component';

describe('EditAppointmentPaymentComponent', () => {
  let component: EditAppointmentPaymentComponent;
  let fixture: ComponentFixture<EditAppointmentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointmentPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
