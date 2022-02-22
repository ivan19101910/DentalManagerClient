import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {PositionService} from "../../positions/position.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {City, CreateOffice, Position} from "../../shared/interfaces";
import {OfficeService} from "../office.service";
import {CitiesService} from "../../cities/cities.service";

@Component({
  selector: 'app-create-office',
  templateUrl: './create-office.component.html',
  styleUrls: ['./create-office.component.scss']
})
export class CreateOfficeComponent implements OnDestroy {

  form: FormGroup
  submitted = false
  cSub?: Subscription
  citiesSub?: Subscription
  cityId?: number
  cities?: City[]

  constructor(
    public auth: AuthService,
    private officeService: OfficeService,
    private cityService: CitiesService,
    private router: Router,
    private http: HttpClient
  ) {
    this.citiesSub = cityService.getAll().subscribe(cities => {
      this.cities = cities;
    })

    this.form = new FormGroup({
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required)
    })
  }

  submit() {
    const office: CreateOffice = {
      id: 0,
      address: this.form.value.address,
      cityId: this.cityId!
    }

    this.cSub = this.officeService.create(office).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/offices'])
      this.submitted = false
    })
  }

  ngOnDestroy(): void {
    if(this.cSub){
      this.cSub.unsubscribe()
    }
  }

}
