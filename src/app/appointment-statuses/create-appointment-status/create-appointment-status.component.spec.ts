import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppointmentStatusComponent } from './create-appointment-status.component';

describe('CreateAppointmentStatusComponent', () => {
  let component: CreateAppointmentStatusComponent;
  let fixture: ComponentFixture<CreateAppointmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppointmentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppointmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
