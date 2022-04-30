import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShowSchedule} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {SchedulesService} from "../schedule.service";

@Component({
  selector: 'app-show-schedules',
  templateUrl: './show-schedules.component.html',
  styleUrls: ['./show-schedules.component.scss']
})
export class ShowSchedulesComponent implements OnInit, OnDestroy {

  schedules?: ShowSchedule[]
  sSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private scheduleService: SchedulesService) { }

  ngOnInit(): void {
    this.sSub = this.scheduleService.getAll().subscribe(schedules => {
      this.schedules = schedules
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
