import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAppointmentPaymentsComponent } from './show-appointment-payments.component';

describe('ShowAppointmentPaymentsComponent', () => {
  let component: ShowAppointmentPaymentsComponent;
  let fixture: ComponentFixture<ShowAppointmentPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAppointmentPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAppointmentPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
