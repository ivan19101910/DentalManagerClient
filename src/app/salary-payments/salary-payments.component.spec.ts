import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPaymentsComponent } from './salary-payments.component';

describe('SalaryPaymentsComponent', () => {
  let component: SalaryPaymentsComponent;
  let fixture: ComponentFixture<SalaryPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
