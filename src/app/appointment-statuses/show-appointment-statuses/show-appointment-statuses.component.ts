import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentPayment, AppointmentStatus} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AppointmentPaymentService} from "../../appointment-payments/appointment-payment.service";
import {AppointmentStatusService} from "../appointment-status.service";

@Component({
  selector: 'app-show-appointment-statuses',
  templateUrl: './show-appointment-statuses.component.html',
  styleUrls: ['./show-appointment-statuses.component.scss']
})
export class ShowAppointmentStatusesComponent implements OnInit, OnDestroy {

  statuses?: AppointmentStatus[]
  sSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private appointmentStatusesService: AppointmentStatusService) { }

  ngOnInit(): void {
    this.sSub = this.appointmentStatusesService.getAll().subscribe(statuses => {
      this.statuses = statuses
    })

  }

  remove(id:number){
    this.dSub = this.appointmentStatusesService.remove(id).subscribe(() => {
      this.statuses = this.statuses!.filter(payments => payments.id !== id)
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
