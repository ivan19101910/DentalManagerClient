import {Component, forwardRef, OnDestroy, OnInit, Provider} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {
  AppointmentServiceCreate, AppointmentServiceEdit,
  CreateAppointment, Patient,
  Service,
  ServiceType,
  ShowWorker,
  WorkerFull
} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {ServiceService} from "../../services/service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointmentService} from "../appointment.service";
import {WorkerService} from "../../workers/worker.service";
import {PatientService} from "../../patients/services/patient.service";

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CreateAppointmentComponent),
  multi: true
}

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class CreateAppointmentComponent implements OnInit, OnDestroy {

  form: FormGroup
  submitted = false
  workers?: ShowWorker[]
  workerAcc?: WorkerFull
  services?: Service[]
  filteredServices?: Service[]
  serviceTypes?: ServiceType[]
  patients?: Patient[]
  totalPrice: number = 0
  pageNumber: number = 1

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
      amount: new FormControl(1,null)
    })
  }

  ngOnDestroy(): void {
    this.tSub?.unsubscribe()
    this.sSub?.unsubscribe()
    this.pSub?.unsubscribe()
    this.stSub?.unsubscribe()
  }

  ngOnInit(): void {
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
        //console.log(this.workerAcc);
    })

  }
  addAppointmentService() {
    let serviceId = this.services!
      .find(val => val.name == this.form.value.service)!.id
    let price = this.services!
      .find(val => val.name == this.form.value.service)!.price

    let existingAppointmentService = this.appointmentServices.filter(x => x.serviceName == this.form.value.service)[0]

    if (existingAppointmentService) {
      existingAppointmentService.amount += this.form.value.amount
      this.totalPrice += existingAppointmentService.servicePrice
    } else {
      let appointmentService: AppointmentServiceCreate =
        {
          serviceName: this.form.value.service,
          servicePrice: price,
          serviceId: serviceId,
          amount: this.form.value.amount
        };
      this.appointmentServices?.push(appointmentService)
      this.totalPrice += appointmentService.servicePrice * appointmentService.amount
    }

  }

  removeAppointmentService(appointmentService: AppointmentServiceCreate):  void{
    const index = this.appointmentServices.indexOf(appointmentService)
    this.appointmentServices.splice(index, 1)
    this.totalPrice -= appointmentService.servicePrice * appointmentService.amount
  }

  filterServices(){
    this.filteredServices = this.services?.filter(val => val.serviceTypeName == this.form.value.serviceType)
  }

  changePage(pageNumber: number){
    this.pageNumber = pageNumber
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
