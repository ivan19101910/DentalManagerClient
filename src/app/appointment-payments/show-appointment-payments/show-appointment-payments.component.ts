import { Component, OnInit } from '@angular/core';
import {AppointmentPayment} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AppointmentPaymentService} from "../appointment-payment.service";

@Component({
  selector: 'app-show-appointment-payments',
  templateUrl: './show-appointment-payments.component.html',
  styleUrls: ['./show-appointment-payments.component.scss']
})
export class ShowAppointmentPaymentsComponent implements OnInit {

  payments?: AppointmentPayment[]
  pSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private appointmentPaymentService: AppointmentPaymentService) { }

  ngOnInit(): void {
    this.pSub = this.appointmentPaymentService.getAll().subscribe(payments => {
      this.payments = payments
    })
  }

  remove(id:number){
    this.dSub = this.appointmentPaymentService.remove(id).subscribe(() => {
      this.payments = this.payments!.filter(payments => payments.id !== id)
    })
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

}
