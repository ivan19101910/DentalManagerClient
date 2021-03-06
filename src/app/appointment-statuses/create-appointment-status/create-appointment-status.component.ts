import { Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointmentStatus} from "../../shared/interfaces";
import {AppointmentStatusService} from "../appointment-status.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-create-appointment-status',
  templateUrl: './create-appointment-status.component.html',
  styleUrls: ['./create-appointment-status.component.scss']
})
export class CreateAppointmentStatusComponent {

  form: FormGroup
  submitted = false

  constructor(
    public auth: AuthService,
    private appointmentStatusService: AppointmentStatusService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(environment.NAME_REGEX)])
    })
  }

  submit() {
    const payment: AppointmentStatus = {
      id: 0,
      name: this.form.value.name
    }

    const response : any = this.appointmentStatusService.create(payment).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/appointmentStatuses'])
      this.submitted = false
    })
  }

}
