import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {CreateSchedule, Day, TimeSegment} from "../../shared/interfaces";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {SchedulesService} from "../schedule.service";
import {DayService} from "../../day/day.service";
import {TimeSegmentService} from "../../time-segment/time-segment.service";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnDestroy {

  form: FormGroup
  submitted = false
  cSub?: Subscription
  daysSub?: Subscription
  segmentsSub?: Subscription
  dayId?: number
  timeSegmentId?: number
  days?: Day[]
  timeSegments?: TimeSegment[]

  constructor(
    public auth: AuthService,
    private scheduleService: SchedulesService,
    private dayService: DayService,
    private timeSegmentService: TimeSegmentService,
    private router: Router,
  ) {
    this.daysSub = dayService.getAll().subscribe(cities => {
      this.days = cities;
    })
    this.segmentsSub = timeSegmentService.getAll().subscribe(segments => {
      this.timeSegments = segments;
    })

    this.form = new FormGroup({
      day: new FormControl(null, Validators.required),
      timeSegment: new FormControl(null, Validators.required),
    })
  }

  submit() {
    const schedule: CreateSchedule = {
      id: 0,
      dayId: this.dayId!,
      timeSegmentId: this.timeSegmentId!
    }

    this.cSub = this.scheduleService.create(schedule).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/schedules'])
      this.submitted = false
    })
  }

  ngOnDestroy(): void {
    if(this.cSub){
      this.cSub.unsubscribe()
    }
  }

}
