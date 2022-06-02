import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {Patient, ShortAppointment} from "../../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-show-patients',
  templateUrl: './show-patients.component.html',
  styleUrls: ['./show-patients.component.scss']
})
export class ShowPatientsComponent implements OnInit, OnDestroy {

  patients?: Patient[]
  pSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  //for search
  filteredPatients!: Patient[]

  dateSearchField!: Date
  nameSearchField!: string
  surnameSearchField!: string
  //

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.pSub = this.patientService.getAll().subscribe(patients => {
      this.patients = patients
      this.filteredPatients = patients
    })
  }

  filter(){
    this.filteredPatients = this.patients!
    if(this.dateSearchField){
      // @ts-ignore
      this.filteredPatients = this.filteredPatients!.filter(p => p.dateOfBirth.substr(0, 10) == this.dateSearchField)
    }
    if(this.nameSearchField){
      this.filteredPatients = this.filteredPatients!.filter(p => p.firstName == this.nameSearchField)
    }
    if(this.surnameSearchField){
      this.filteredPatients = this.filteredPatients!.filter(p => p.lastName == this.surnameSearchField)
    }
  }
  clearFilter(){
    // @ts-ignore
    this.nameSearchField = null
    // @ts-ignore
    this.surnameSearchField = null
    // @ts-ignore
    this.dateSearchField = null
    this.filteredPatients = this.patients!
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

  remove(id:number){
    this.dSub = this.patientService.remove(id).subscribe(() => {
      this.patients = this.patients!.filter(patients => patients.id !== id)
      this.filteredPatients = this.patients
    })
  }

}
