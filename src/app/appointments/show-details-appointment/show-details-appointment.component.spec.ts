import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsAppointmentComponent } from './show-details-appointment.component';

describe('ShowDetailsAppointmentComponent', () => {
  let component: ShowDetailsAppointmentComponent;
  let fixture: ComponentFixture<ShowDetailsAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailsAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
