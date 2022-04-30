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
  //for search
  filteredAppointments!: ShortAppointment[]

  dataSearchField!: Date
  workerSearchField!: string
  patientSearchField!: string
  //

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.aSub = this.appointmentService.getAll().subscribe(appointments => {
      this.appointments = appointments
      this.filteredAppointments = appointments
    })
  }
  filter(){
    this.filteredAppointments = this.appointments!
    if(this.dataSearchField){
      // @ts-ignore
      this.filteredAppointments = this.filteredAppointments!.filter(app => app.appointmentDate.substr(0, 10) == this.dataSearchField)
    }
    if(this.workerSearchField){
      this.filteredAppointments = this.filteredAppointments!.filter(app => `${app.workerName} ${app.workerSurname}` == this.workerSearchField)
    }
    if(this.patientSearchField){
      this.filteredAppointments = this.filteredAppointments!.filter(app => `${app.patientName} ${app.patientSurname}` == this.patientSearchField)
    }
  }
  clearFilter(){
    // @ts-ignore
    this.patientSearchField = null
    // @ts-ignore
    this.workerSearchField = null
    // @ts-ignore
    this.dataSearchField = null
    this.filteredAppointments = this.appointments!
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
