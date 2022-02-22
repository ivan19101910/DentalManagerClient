import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalaryPayment, ShowOffice, ShowSalaryPayment} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {OfficeService} from "../../offices/office.service";
import {SalaryPaymentService} from "../salary-payment.service";

@Component({
  selector: 'app-show-salary-payments',
  templateUrl: './show-salary-payments.component.html',
  styleUrls: ['./show-salary-payments.component.scss']
})
export class ShowSalaryPaymentsComponent implements OnInit, OnDestroy {

  payments?: ShowSalaryPayment[]
  sSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private salaryPaymentService: SalaryPaymentService) { }

  ngOnInit(): void {
    this.sSub = this.salaryPaymentService.getAll().subscribe(payments => {
      this.payments = payments
    })

  }

  remove(id:number){
    this.dSub = this.salaryPaymentService.remove(id).subscribe(() => {
      this.payments = this.payments!.filter(payments => payments.id !== id)
    })
  }

  ngOnDestroy(){
    if(this.sSub){
      this.sSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

}
