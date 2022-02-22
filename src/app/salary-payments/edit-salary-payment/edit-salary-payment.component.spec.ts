import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalaryPaymentComponent } from './edit-salary-payment.component';

describe('EditSalaryPaymentComponent', () => {
  let component: EditSalaryPaymentComponent;
  let fixture: ComponentFixture<EditSalaryPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSalaryPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalaryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
