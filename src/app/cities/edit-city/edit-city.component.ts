import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppointmentStatus, City} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AppointmentStatusService} from "../../appointment-statuses/appointment-status.service";
import {CitiesService} from "../cities.service";

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit, OnDestroy {

  form?: FormGroup
  city?: City
  submitted = false
  cSub?: Subscription

  constructor(
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.citiesService.getById(params['id'])
      })
    ).subscribe((city: City) => {
      this.city = city
      this.form = new FormGroup({
        name: new FormControl(city.name, Validators.required),
      })

    })

  }
  submit(){
    if(this.form?.invalid){
      return
    }

    else{
      this.submitted = true
      this.cSub = this.citiesService.update({
        id: this.city!.id,
        name: this.form!.value.name
      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/cities'])
      })
    }
  }

  ngOnDestroy(): void {
    if(this.cSub){
      this.cSub.unsubscribe()
    }
  }

}
