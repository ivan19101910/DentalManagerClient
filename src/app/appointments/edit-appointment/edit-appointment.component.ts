import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AppointmentServiceCreate,
  CreateAppointment,
  Patient,
  Service,
  ServiceType, ShortAppointment,
  ShowWorker,
  WorkerFull
} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {AppointmentService} from "../appointment.service";
import {WorkerService} from "../../workers/worker.service";
import {ServiceService} from "../../services/service.service";
import {PatientService} from "../../patients/services/patient.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit, OnDestroy {

  form: FormGroup
  submitted = false
  workers?: ShowWorker[]
  workerAcc?: WorkerFull
  services?: Service[]
  serviceTypes?: ServiceType[]
  patients?: Patient[]
  workerEdit?: ShowWorker

  workerId?: number
  patientId?: number

  appointmentServices: AppointmentServiceCreate[] = []

  tSub?: Subscription
  pSub?: Subscription
  sSub?: Subscription
  stSub?: Subscription
  page:number = 1

  constructor(
    public auth: AuthService,
    private appointmentService: AppointmentService,
    private workerService : WorkerService,
    private serviceService : ServiceService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({

      appointmentDate: new FormControl(null, Validators.required),
      appointmentTime: new FormControl(null, Validators.required),
      appointmentEndTime: new FormControl(null),
      notes: new FormControl(null),
      totalSum: new FormControl(null),
      worker: new FormControl(null, Validators.required),
      patient: new FormControl(null, Validators.required),
      serviceType: new FormControl(null),
      service: new FormControl(null),
      amount: new FormControl(null)
    })
  }

  ngOnDestroy(): void {
    this.tSub?.unsubscribe()
    this.sSub?.unsubscribe()
    this.pSub?.unsubscribe()
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.appointmentService.getById(params['id'])
      })
    ).subscribe((appointment: ShortAppointment) => {
      this.appointment = appointment
      this.form = new FormGroup({
        appointmentDate: new FormControl(null, Validators.required),
        appointmentTime: new FormControl(null, Validators.required),
        appointmentEndTime: new FormControl(null),
        notes: new FormControl(null),
        totalSum: new FormControl(null),
        worker: new FormControl(null, Validators.required),
        patient: new FormControl(null, Validators.required),
        serviceType: new FormControl(null),
        service: new FormControl(null),
        amount: new FormControl(null)
      })

      // this.form = new FormGroup({
      //   name: new FormControl(patient.firstName, Validators.required),
      //   lastName: new FormControl(patient.lastName, Validators.required),
      //   address: new FormControl(patient.address, Validators.required),
      //   date: new FormControl(new Date(patient.dateOfBirth).toISOString().substr(0, 10), Validators.required),
      //   phoneNumber: new FormControl(patient.phoneNumber, Validators.required),
      // })
    })


    this.tSub = this.workerService.getAll().subscribe(workers => {
      this.workers = workers;
    })
    this.sSub = this.serviceService.getAll().subscribe(services => {
      this.services = services
    })
    this.stSub = this.serviceService.getAllTypes().subscribe(serviceTypes => {
      this.serviceTypes = serviceTypes
    })
    this.pSub = this.patientService.getAll().subscribe(patients => {
      this.patients = patients
    })
    this.workerService.getById(+localStorage.getItem("id")!)
      .subscribe(worker =>{
        this.workerAcc = worker;
        console.log(this.workerAcc);
      })

  }
  addAppointmentService(){
    let serviceId = this.services!
      .find(val => val.name == this.form.value.service)!.id
    let price = this.services!
      .find(val => val.name == this.form.value.service)!.price
    let appointmentService: AppointmentServiceCreate =
      {
        serviceName: this.form.value.service,
        servicePrice: price,
        serviceId: serviceId,
        amount: this.form.value.amount
      };
    this.appointmentServices?.push(appointmentService)

  }
  submit() {

    const appointment: CreateAppointment ={
      appointmentDate: this.form.value.appointmentDate,
      notes: this.form.value.notes,
      appointmentTime: this.form.value.appointmentTime,
      realEndTime: this.form.value.appointmentEndTime,
      workerId: this.workerId!,
      patientId: this.patientId!,
      statusId: 1,
      totalSum: this.form.value.totalSum,
      appointmentServices: this.appointmentServices
    }
    this.appointmentService.create(appointment).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/appointments'])
      this.submitted = false

    })

  }

}
