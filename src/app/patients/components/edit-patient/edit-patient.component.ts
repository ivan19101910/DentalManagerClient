import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PatientService} from "../../services/patient.service";
import {Subscription, switchMap} from "rxjs";
import {Patient} from "../../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit, OnDestroy {

  form?: FormGroup
  patient?: Patient
  submitted = false
  uSub?: Subscription
  dateObj?: Date

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.patientService.getById(params['id'])
      })
    ).subscribe((patient: Patient) => {
      this.patient = patient
      this.form = new FormGroup({
        name: new FormControl(patient.firstName, Validators.required),
        lastName: new FormControl(patient.lastName, Validators.required),
        address: new FormControl(patient.address, Validators.required),
        date: new FormControl(new Date(patient.dateOfBirth).toISOString().substr(0, 10), Validators.required),
        phoneNumber: new FormControl(patient.phoneNumber, Validators.required),
      })

    })



  }
  submit(){
    if(this.form?.invalid){
      return
    }

    else{
      this.submitted = true
      this.uSub = this.patientService.update({
        id: this.patient!.id,
        firstName: this.form!.value.name,
        lastName: this.form!.value.lastName,
        address: this.form!.value.address,
        dateOfBirth: this.form!.value.date,
        phoneNumber: this.form!.value.phoneNumber,
      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/patients'])
      })
    }
  }

  ngOnDestroy(): void {
    if(this.uSub){
      this.uSub.unsubscribe()
    }
  }
}
