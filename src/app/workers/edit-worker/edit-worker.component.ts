import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AppointmentServiceEdit,
  City,
  CreateWorker, CreateWorkerSchedule,
  EditWorker, FullWorkerSchedule,
  Position,
  Service,
  ShowOffice, ShowSchedule,
  ShowWorker,
  WorkerFull, WorkerSchedule
} from "../../shared/interfaces";
import {Observable, Subscription, switchMap} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {WorkerService} from "../worker.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SchedulesService} from "../../schedules/schedule.service";

@Component({
  selector: 'app-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.scss']
})
export class EditWorkerComponent implements OnInit {

  form: FormGroup
  submitted = false
  worker?: WorkerFull
  offices?: ShowOffice[]
  positions?: Position[]
  cities?: City[]
  filteredOffices?: ShowOffice[]
  //filteredOffices?: Observable<ShowOffice[]>
  pageNumber: number = 1

  oSub?: Subscription
  pSub?: Subscription
  cSub?: Subscription
  uSub?: Subscription
  sSub?: Subscription


  //schedule
  schedules?: ShowSchedule[]
  workerSchedules: FullWorkerSchedule[] = []
  page: number = 1
  scheduleId?: number
  //

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.oSub = this.workerService.getAllOffices().subscribe(offices => {
      this.offices = offices;
    })
    this.pSub = this.workerService.getAllPositions().subscribe(positions => {
      this.positions = positions;
    })
    this.cSub = this.workerService.getAllCities().subscribe(cities => {
      this.cities = cities;

      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.workerService.getById(params['id'])
        })
      ).subscribe((worker: WorkerFull) => {
        this.worker = worker
        this.workerSchedules = worker.workerSchedules
        console.log(this.workerSchedules)
        this.form = new FormGroup({
          name: new FormControl(worker.firstName, Validators.required),
          lastName: new FormControl(worker.lastName, Validators.required),
          email: new FormControl(worker.email, Validators.required),
          address: new FormControl(worker.address, Validators.required),
          password: new FormControl(worker.password, Validators.required),
          phoneNumber: new FormControl(worker.phoneNumber, Validators.required),
          position: new FormControl(worker.positionName),
          city: new FormControl(worker.officeCity),
          officeAddress: new FormControl(worker.officeAddress),
          schedule: new FormControl(null)
        })
        this.filterOffices()
      })

    })

  }

  changePage(pageNumber: number){
    this.pageNumber = pageNumber
  }
  addWorkerSchedule() {
    let existingWorkerSchedule = this.workerSchedules.filter(x => x.scheduleId == this.scheduleId)[0]

    if (!existingWorkerSchedule) {
      let schedule = this.schedules!
        .find(val => val.id == this.scheduleId)!
      //console.log(schedule)
      // let worker: ShowWorker = {
      //   id: 0,
      //   firstName: 'string1',
      //   lastName: 'string2',
      //   positionName: 'string3',
      //   officeAddress: 'string4',
      //   city: 'string5'
      //
      // }

      let workerSchedule: FullWorkerSchedule =
        {
          id: 0,
          scheduleId: this.scheduleId!,
          workerId: 0,
          day: schedule.day,
          timeStart: schedule.timeStart,//no logic just костиль
          timeEnd: schedule.timeEnd
          //schedule: schedule,
          //worker: undefined
        };
      this.workerSchedules?.push(workerSchedule)
    }
    else{

    }

  }

  removeWorkerSchedule(workerSchedule: FullWorkerSchedule):  void{
    const index = this.workerSchedules!.indexOf(workerSchedule)
    this.workerSchedules!.splice(index, 1)
  }

  filterOffices(): void{
    this.filteredOffices = this.offices?.filter(val => val.cityName == this.form.value.city)
  }
  submit() {
    if(this.form?.invalid){
      return
    }

    else{
      let officeId = this.offices!
        .find(val => val.address == this.form.value.officeAddress && val.cityName == this.form.value.city)!.id
      let positionId = this.positions!
        .find(val => val.positionName == this.form.value.position)!.id

      this.submitted = true

      const mapItems = (item:CreateWorkerSchedule):{ workerId: number; id: number; scheduleId: number } => {
        return {
          id: item.id,
          workerId: item.workerId,
          scheduleId: item.scheduleId
        }
      };
      const mappedData = this.workerSchedules.map(mapItems);

      this.uSub = this.workerService.update({
        id: this.worker!.id,
        firstName: this.form.value.name,
        lastName: this.form.value.lastName,
        phoneNumber: this.form.value.phoneNumber,
        email: this.form.value.email,
        password: this.form.value.password,
        address: this.form.value.address,
        positionId: positionId,
        officeId: officeId,
        workerSchedules: mappedData
      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/workers'])
      })
    }

    // const worker: EditWorker = {
    //   id: this.worker!.id,
    //   firstName: this.form.value.name,
    //   lastName: this.form.value.lastName,
    //   phoneNumber: this.form.value.phoneNumber,
    //   email: this.form.value.email,
    //   password: this.form.value.password,
    //   address: this.form.value.address,
    //   positionId: positionId,
    //   officeId: officeId
    // }
    //
    // const response : any = this.http.post(`${environment.serverUrl}worker/update`, worker).subscribe(() => {
    //   this.form.reset()
    //   this.router.navigate(['/workers'])
    //   this.submitted = false
    // })
  }

  ngOnDestroy(): void {
    this.pSub?.unsubscribe()
    this.oSub?.unsubscribe()
    this.cSub?.unsubscribe()
    this.uSub?.unsubscribe()
  }

}
