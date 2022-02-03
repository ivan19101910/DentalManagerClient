import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Patient, User} from "../../../shared/interfaces";
import {tap} from "rxjs/operators";
import {catchError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit {
  form: FormGroup
  submitted = false

  constructor(
    public auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {

  }

  submit() {
    console.log("submitted")

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

    console.log(response)
  }


}
