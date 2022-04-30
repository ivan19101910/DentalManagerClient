import {Component, OnDestroy, OnInit} from '@angular/core';
import {Service, ShowSchedule, WorkerSchedule} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {ServiceService} from "../../services/service.service";
import {WorkerScheduleService} from "../worker-schedule.service";
import {SchedulesService} from "../../schedules/schedule.service";

@Component({
  selector: 'app-show-worker-schedules',
  templateUrl: './show-worker-schedules.component.html',
  styleUrls: ['./show-worker-schedules.component.scss']
})
export class ShowWorkerSchedulesComponent implements OnInit, OnDestroy {

  schedules?: ShowSchedule[]
  sSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private scheduleService: WorkerScheduleService) { }

  ngOnInit(): void {
    this.sSub = this.scheduleService.getAll().subscribe(schedules => {
      this.schedules = schedules
      console.log(schedules)
    })

  }

  remove(id:number){
    this.dSub = this.scheduleService.remove(id).subscribe(() => {
      this.schedules = this.schedules!.filter(schedules => schedules.id !== id)
    })
  }

  ngOnDestroy(){
    if(this.sSub){
      this.sSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

}
