import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Patient, User} from "../../../shared/interfaces";
import {tap} from "rxjs/operators";
import {catchError, Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit{
  form: FormGroup
  submitted = false

  constructor(
    public auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(environment.NAME_REGEX)]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(environment.NAME_REGEX)]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern(environment.SERVICENAME_REGEX)]),
      date: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(environment.PHONENUMBER_REGEX)]),

    })
  }

  ngOnInit(): void {

  }

  submit() {
    const patient: Patient = {
      id: 0,
      firstName: this.form.value.name,
      lastName: this.form.value.lastName,
      address: this.form.value.address,
      dateOfBirth: this.form.value.date,
      phoneNumber: this.form.value.phoneNumber,
    }

      const response : any = this.http.post(`${environment.serverUrl}patient/create`, patient).subscribe(() => {
        this.form.reset()
        this.router.navigate(['/patients'])
        this.submitted = false


    })

  }
}
