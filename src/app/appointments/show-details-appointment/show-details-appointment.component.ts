import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentService} from "../appointment.service";
import {AppointmentFull} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-show-details-appointment',
  templateUrl: './show-details-appointment.component.html',
  styleUrls: ['./show-details-appointment.component.scss']
})
export class ShowDetailsAppointmentComponent implements OnInit, OnDestroy {

  appointment?: AppointmentFull
  eSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.eSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.appointmentService.getById(params['id'])
      })
    ).subscribe((appointment: AppointmentFull) => {
      this.appointment = appointment
      console.log(this.appointment)
      })

  }

  remove(id:number){
    this.dSub = this.appointmentService.remove(id).subscribe(() => {
      this.router.navigate(['/appointments'])
    })
  }

  ngOnDestroy(): void {
    this.eSub?.unsubscribe()
    this.dSub?.unsubscribe()
  }

}
