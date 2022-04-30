import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Day, ShowSchedule, TimeSegment} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DayService} from "../../day/day.service";
import {TimeSegmentService} from "../../time-segment/time-segment.service";
import {SchedulesService} from "../schedule.service";

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent implements OnInit, OnDestroy {

  form?: FormGroup
  schedule?: ShowSchedule
  submitted = false
  eSub?: Subscription
  daysSub?: Subscription
  timeSegmentSub?: Subscription
  dayId?: number
  timeSegmentId?: number
  days?: Day[]
  timeSegments?: TimeSegment[]

  constructor(
    private route: ActivatedRoute,
    private scheduleService: SchedulesService,
    private dayService: DayService,
    private timeSegmentService: TimeSegmentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.scheduleService.getById(params['id'])
      })
    ).subscribe((schedule: ShowSchedule) => {
      this.schedule = schedule
      this.form = new FormGroup({
        day: new FormControl(null, Validators.required),
        timeSegment: new FormControl(null, Validators.required),
      })
      this.dayId = schedule.dayId
      this.timeSegmentId = schedule.timeSegmentId
    })
    this.daysSub = this.dayService.getAll().subscribe(days => {
      this.days = days;
    })
    this.timeSegmentSub = this.timeSegmentService.getAll().subscribe(timeSegments => {
      this.timeSegments = timeSegments;
    })
  }
  submit(){
    if(this.form?.invalid){
      return
    }

    else{
      this.submitted = true
      this.eSub = this.scheduleService.update({
        id: this.schedule!.id,
        dayId: this.dayId!,
        timeSegmentId: this.timeSegmentId!
      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/schedules'])
      })
    }
  }

  ngOnDestroy(): void {
    if(this.eSub){
      this.eSub.unsubscribe()
    }
  }

}
