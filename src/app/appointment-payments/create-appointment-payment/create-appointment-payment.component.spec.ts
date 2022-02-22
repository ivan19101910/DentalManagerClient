import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppointmentPaymentComponent } from './create-appointment-payment.component';

describe('CreateAppointmentPaymentComponent', () => {
  let component: CreateAppointmentPaymentComponent;
  let fixture: ComponentFixture<CreateAppointmentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppointmentPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppointmentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
