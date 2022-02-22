import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSalaryPaymentsComponent } from './show-salary-payments.component';

describe('ShowSalaryPaymentsComponent', () => {
  let component: ShowSalaryPaymentsComponent;
  let fixture: ComponentFixture<ShowSalaryPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSalaryPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSalaryPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
