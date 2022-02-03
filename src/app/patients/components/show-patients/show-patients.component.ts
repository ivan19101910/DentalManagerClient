import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {Patient} from "../../../shared/interfaces";
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

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.pSub = this.patientService.getAll().subscribe(patients => {
      this.patients = patients
    })
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
    })
  }

}
