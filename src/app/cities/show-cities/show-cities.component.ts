import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentStatus, City} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AppointmentStatusService} from "../../appointment-statuses/appointment-status.service";
import {CitiesService} from "../cities.service";

@Component({
  selector: 'app-show-cities',
  templateUrl: './show-cities.component.html',
  styleUrls: ['./show-cities.component.scss']
})
export class ShowCitiesComponent implements OnInit, OnDestroy {

  cities?: City[]
  cSub?: Subscription
  dSub?: Subscription

  page: number = 1;

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.cSub = this.citiesService.getAll().subscribe(cities => {
      this.cities = cities
    })

  }

  remove(id:number){
    this.dSub = this.citiesService.remove(id).subscribe(() => {
      this.cities = this.cities!.filter(cities => cities.id !== id)
    })
  }

  ngOnDestroy(){
    if(this.cSub){
      this.cSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

}
