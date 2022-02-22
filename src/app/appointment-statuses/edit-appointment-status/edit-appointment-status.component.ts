import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppointmentStatus} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AppointmentStatusService} from "../appointment-status.service";

@Component({
  selector: 'app-edit-appointment-status',
  templateUrl: './edit-appointment-status.component.html',
  styleUrls: ['./edit-appointment-status.component.scss']
})
export class EditAppointmentStatusComponent implements OnInit, OnDestroy {

  form?: FormGroup
  status?: AppointmentStatus
  submitted = false
  uSub?: Subscription
  dateObj?: Date

  constructor(
    private route: ActivatedRoute,
    private appointmentStatusesService: AppointmentStatusService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.appointmentStatusesService.getById(params['id'])
      })
    ).subscribe((appointmentStatus: AppointmentStatus) => {
      this.status = appointmentStatus
      this.form = new FormGroup({
        name: new FormControl(appointmentStatus.name, Validators.required),
      })

    })



  }
  submit(){
    if(this.form?.invalid){
      return
    }

    else{
      this.submitted = true
      this.uSub = this.appointmentStatusesService.update({
        id: this.status!.id,
        name: this.form!.value.name
      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/appointmentStatuses'])
      })
    }
  }

  ngOnDestroy(): void {
    if(this.uSub){
      this.uSub.unsubscribe()
    }
  }

}
