import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalaryPaymentComponent } from './create-salary-payment.component';

describe('CreateSalaryPaymentComponent', () => {
  let component: CreateSalaryPaymentComponent;
  let fixture: ComponentFixture<CreateSalaryPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSalaryPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSalaryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
