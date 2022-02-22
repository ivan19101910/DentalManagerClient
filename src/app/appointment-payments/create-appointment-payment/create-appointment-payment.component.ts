import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppointmentPayment} from "../../shared/interfaces";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointmentPaymentService} from "../appointment-payment.service";

@Component({
  selector: 'app-create-appointment-payment',
  templateUrl: './create-appointment-payment.component.html',
  styleUrls: ['./create-appointment-payment.component.scss']
})
export class CreateAppointmentPaymentComponent implements OnInit, OnDestroy {

  form: FormGroup
  submitted = false


  constructor(
    public auth: AuthService,
    private appointmentPaymentsService: AppointmentPaymentService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      appointmentId: new FormControl(null, Validators.required),
      total: new FormControl(null, Validators.required)
    })
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

  }

  submit() {
    const payment: AppointmentPayment = {
      id: 0,
      transactionNumber: 1,
      appointmentId: this.form.value.appointmentId,
      total: this.form.value.total
    }

    const response : any = this.appointmentPaymentsService.create(payment).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/appointmentPayments'])
      this.submitted = false
    })
  }

}
