import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShortAppointment} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AppointmentService} from "../appointment.service";

@Component({
  selector: 'app-show-appointments',
  templateUrl: './show-appointments.component.html',
  styleUrls: ['./show-appointments.component.scss']
})
export class ShowAppointmentsComponent implements OnInit, OnDestroy {

  appointments?: ShortAppointment[]
  aSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.aSub = this.appointmentService.getAll().subscribe(appointments => {
      this.appointments = appointments
    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

  remove(id:number){
    this.dSub = this.appointmentService.remove(id).subscribe(() => {
      this.appointments = this.appointments!.filter(appointments => appointments.id !== id)
    })
  }

}
