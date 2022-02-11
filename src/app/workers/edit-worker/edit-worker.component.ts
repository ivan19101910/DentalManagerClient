import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  City,
  CreateWorker,
  EditWorker,
  Position,
  Service,
  ShowOffice,
  ShowWorker,
  WorkerFull
} from "../../shared/interfaces";
import {Observable, Subscription, switchMap} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {WorkerService} from "../worker.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

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

  oSub?: Subscription
  pSub?: Subscription
  cSub?: Subscription
  uSub?: Subscription

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      position: new FormControl(null),
      city: new FormControl(null),
      officeAddress: new FormControl(null)
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
        this.form = new FormGroup({
          name: new FormControl(worker.firstName, Validators.required),
          lastName: new FormControl(worker.lastName, Validators.required),
          email: new FormControl(worker.email, Validators.required),
          address: new FormControl(worker.address, Validators.required),
          password: new FormControl(worker.password, Validators.required),
          phoneNumber: new FormControl(worker.phoneNumber, Validators.required),
          position: new FormControl(worker.positionName),
          city: new FormControl(worker.officeCity),
          officeAddress: new FormControl(worker.officeAddress)
        })
        this.filterOffices()
      })

    })

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
      this.uSub = this.workerService.update({
        id: this.worker!.id,
        firstName: this.form.value.name,
        lastName: this.form.value.lastName,
        phoneNumber: this.form.value.phoneNumber,
        email: this.form.value.email,
        password: this.form.value.password,
        address: this.form.value.address,
        positionId: positionId,
        officeId: officeId
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
