import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  City,
  CreateWorker,
  ShowOffice,
  Position,
  ShowSchedule,
  WorkerSchedule, CreateWorkerSchedule, ShowWorker
} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {WorkerService} from "../worker.service";
import {SchedulesService} from "../../schedules/schedule.service";

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.scss']
})
export class CreateWorkerComponent implements OnInit {

  form: FormGroup
  submitted = false
  offices?: ShowOffice[]
  positions?: Position[]
  cities?: City[]
  filteredOffices?: ShowOffice[]
  pageNumber: number = 1

  //schedule
  schedules?: ShowSchedule[]
  workerSchedules: WorkerSchedule[] = []
  page: number = 1
  scheduleId?: number
  //

  oSub?: Subscription
  pSub?: Subscription
  cSub?: Subscription
  sSub?: Subscription

  constructor(
    public auth: AuthService,
    private workerService: WorkerService,
    private scheduleService: SchedulesService,
    private router: Router,
    private http: HttpClient
  ) {
    this.sSub = this.scheduleService.getAll().subscribe(schedules => {
      this.schedules = schedules;
    })

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      position: new FormControl(null),
      city: new FormControl(null),
      officeAddress: new FormControl(null),
      schedule: new FormControl(null)
    })
  }

  filterOffices(): void{
    this.filteredOffices = this.offices?.filter(val => val.cityName == this.form.value.city)
  }

  changePage(pageNumber: number){
    this.pageNumber = pageNumber
  }

  addWorkerSchedule() {
    let existingWorkerSchedule = this.workerSchedules.filter(x => x.scheduleId == this.scheduleId)[0]

    if (!existingWorkerSchedule) {
      let schedule = this.schedules!
        .find(val => val.id == this.scheduleId)!
      console.log(schedule)
      let worker: ShowWorker = {
        id: 0,
        firstName: 'string1',
        lastName: 'string2',
        positionName: 'string3',
        officeAddress: 'string4',
        city: 'string5'

      }

      let workerSchedule: WorkerSchedule =
        {
          id: 0,
          scheduleId: this.scheduleId!,
          workerId: 0,
          schedule: schedule,
          worker: undefined
        };
      this.workerSchedules?.push(workerSchedule)
    }
    else{

    }

  }

  removeWorkerSchedule(workerSchedule: WorkerSchedule):  void{
    const index = this.workerSchedules!.indexOf(workerSchedule)
    this.workerSchedules!.splice(index, 1)
  }

  ngOnInit(): void {
    this.oSub = this.workerService.getAllOffices().subscribe(offices => {
      this.offices = offices;
    })
    this.pSub = this.workerService.getAllPositions().subscribe(positions => {
      this.positions = positions;
    })
    this.cSub = this.workerService.getAllCities().subscribe(cities => {
      this.cities = cities;
    })
  }

  submit() {
    console.log('submit')
    let officeId = this.offices!
      .find(val => val.address == this.form.value.officeAddress && val.cityName == this.form.value.city)!.id
    let positionId = this.positions!
      .find(val => val.positionName == this.form.value.position)!.id

    const mapItems = (item:CreateWorkerSchedule):{ workerId: number; id: number; scheduleId: number } => {
      return {
        id: item.id,
        workerId: item.workerId,
        scheduleId: item.scheduleId
      }
    };
    const mappedData = this.workerSchedules.map(mapItems);
    const worker: CreateWorker = {
      firstName: this.form.value.name,
      lastName: this.form.value.lastName,
      phoneNumber: this.form.value.phoneNumber,
      email: this.form.value.email,
      password: this.form.value.password,
      address: this.form.value.address,
      positionId: positionId,
      officeId: officeId,
      //workerSchedules: this.workerSchedules
      workerSchedules: mappedData
    }
    console.log(worker)

    const response : any = this.http.post(`${environment.serverUrl}worker/create`, worker).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/workers'])
      this.submitted = false
    })
  }

  ngOnDestroy(): void {
    this.pSub?.unsubscribe()
    this.oSub?.unsubscribe()
    this.cSub?.unsubscribe()
  }

}
