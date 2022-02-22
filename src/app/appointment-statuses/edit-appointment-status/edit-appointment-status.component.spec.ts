import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentStatusComponent } from './edit-appointment-status.component';

describe('EditAppointmentStatusComponent', () => {
  let component: EditAppointmentStatusComponent;
  let fixture: ComponentFixture<EditAppointmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointmentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
