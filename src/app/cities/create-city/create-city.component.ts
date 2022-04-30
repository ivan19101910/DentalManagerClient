import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {AppointmentStatusService} from "../../appointment-statuses/appointment-status.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointmentStatus, City} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {CitiesService} from "../cities.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.scss']
})
export class CreateCityComponent implements OnDestroy {

  form: FormGroup
  submitted = false
  cSub?: Subscription

  constructor(
    public auth: AuthService,
    private citiesService: CitiesService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(environment.NAME_REGEX)])
    })
  }

  submit() {
    const city: City = {
      id: 0,
      name: this.form.value.name
    }

    this.cSub = this.citiesService.create(city).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/cities'])
      this.submitted = false
    })
  }

  ngOnDestroy(): void {
    if(this.cSub){
      this.cSub.unsubscribe()
    }
  }

}
