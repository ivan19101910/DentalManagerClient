import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAppointmentStatusesComponent } from './show-appointment-statuses.component';

describe('ShowAppointmentStatusesComponent', () => {
  let component: ShowAppointmentStatusesComponent;
  let fixture: ComponentFixture<ShowAppointmentStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAppointmentStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAppointmentStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
