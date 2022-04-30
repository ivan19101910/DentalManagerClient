import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentFull, Patient, WorkerFull} from "../../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {WorkerService} from "../../../workers/worker.service";
import {AppointmentService} from "../../../appointments/appointment.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-show-details-patient',
  templateUrl: './show-details-patient.component.html',
  styleUrls: ['./show-details-patient.component.scss']
})
export class ShowDetailsPatientComponent implements OnInit, OnDestroy {

  patient?: Patient
  dSub?: Subscription
  aSub?: Subscription
  appointments!: AppointmentFull[]

  page: number = 1;
  appointmentsPage: number = 1;

  constructor(private patientService: PatientService,
              private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private router: Router) {

    this.dSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.patientService.getById(params['id'])
      })
    ).subscribe((patient: Patient) => {
      this.patient = patient
      this.aSub = this.appointmentService.getByPatientId(patient.id).subscribe((appointments: AppointmentFull[]) =>{
        this.appointments = appointments
      })
    })
  }
  remove(id:number){
    this.dSub = this.patientService.remove(id).subscribe(() => {
      this.router.navigate(['/patients'])
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.dSub?.unsubscribe()
  }

}
