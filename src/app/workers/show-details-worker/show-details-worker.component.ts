import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentFull, WorkerFull} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {AppointmentService} from "../../appointments/appointment.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WorkerService} from "../worker.service";

@Component({
  selector: 'app-show-details-worker',
  templateUrl: './show-details-worker.component.html',
  styleUrls: ['./show-details-worker.component.scss']
})
export class ShowDetailsWorkerComponent implements OnInit, OnDestroy {

  worker?: WorkerFull
  dSub?: Subscription
  aSub?: Subscription
  appointments!: AppointmentFull[]

  page: number = 1;
  appointmentsPage: number = 1;

  constructor(private workerService: WorkerService,
              private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private router: Router) {
    this.dSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.workerService.getById(params['id'])
      })
    ).subscribe((worker: WorkerFull) => {
      this.worker = worker
      //console.log(this.worker)
      this.aSub = this.appointmentService.getByWorkerId(worker.id).subscribe((appointments: AppointmentFull[]) =>{
        this.appointments = appointments
        //console.log(appointments)
      })
    })
  }

  remove(id:number){
    this.dSub = this.workerService.remove(id).subscribe(() => {
      this.router.navigate(['/workers'])
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.dSub?.unsubscribe()
  }

}
