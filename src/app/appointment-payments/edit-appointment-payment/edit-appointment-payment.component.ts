import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppointmentPayment, AppointmentStatus} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AppointmentPaymentService} from "../appointment-payment.service";

@Component({
  selector: 'app-edit-appointment-payment',
  templateUrl: './edit-appointment-payment.component.html',
  styleUrls: ['./edit-appointment-payment.component.scss']
})
export class EditAppointmentPaymentComponent implements OnInit, OnDestroy {

  form?: FormGroup
  payment?: AppointmentPayment
  submitted = false
  uSub?: Subscription
  dateObj?: Date

  constructor(
    private route: ActivatedRoute,
    private appointmentPaymentsService: AppointmentPaymentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.appointmentPaymentsService.getById(params['id'])
      })
    ).subscribe((appointmentPayment: AppointmentPayment) => {
      this.payment = appointmentPayment
      this.form = new FormGroup({
        appointmentId: new FormControl(appointmentPayment.appointmentId, Validators.required),
        total: new FormControl(appointmentPayment.total, Validators.required)
      })

    })



  }
  submit(){
    if(this.form?.invalid){
      return
    }

    else{
      this.submitted = true
      this.uSub = this.appointmentPaymentsService.update({
        id: this.payment!.id,
        transactionNumber: this.payment!.transactionNumber,
        total: this.form!.value.total,
        appointmentId: this.form!.value.appointmentId
      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/appointmentServices'])
      })
    }
  }

  ngOnDestroy(): void {
    if(this.uSub){
      this.uSub.unsubscribe()
    }
  }

}

