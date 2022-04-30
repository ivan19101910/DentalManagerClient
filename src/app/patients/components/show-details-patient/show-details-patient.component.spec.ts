import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsPatientComponent } from './show-details-patient.component';

describe('ShowDetailsPatientComponent', () => {
  let component: ShowDetailsPatientComponent;
  let fixture: ComponentFixture<ShowDetailsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailsPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
