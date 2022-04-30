import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {City, CreateOffice, Position, ShowOffice} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PositionService} from "../../positions/position.service";
import {CitiesService} from "../../cities/cities.service";
import {OfficeService} from "../office.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.scss']
})
export class EditOfficeComponent implements OnInit, OnDestroy {

  form?: FormGroup
  office?: ShowOffice
  submitted = false
  eSub?: Subscription
  citiesSub?: Subscription
  cityId?: number
  cities?: City[]

  constructor(
    private route: ActivatedRoute,
    private officeService: OfficeService,
    private cityService: CitiesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.officeService.getById(params['id'])
      })
    ).subscribe((office: ShowOffice) => {
      this.office = office
      this.form = new FormGroup({
        address: new FormControl(office.address, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(environment.SERVICENAME_REGEX)]),
        city: new FormControl(null, Validators.required),
      })
      this.cityId = office.cityId
    })
    this.citiesSub = this.cityService.getAll().subscribe(cities => {
      this.cities = cities;
    })
  }
  submit(){
    if(this.form?.invalid){
      return
    }

    else{
      this.submitted = true
      this.eSub = this.officeService.update({
        id: this.office!.id,
        address: this.form!.value.address,
        cityId: this.cityId!
      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/offices'])
      })
    }
  }

  ngOnDestroy(): void {
    if(this.eSub){
      this.eSub.unsubscribe()
    }
  }

}
