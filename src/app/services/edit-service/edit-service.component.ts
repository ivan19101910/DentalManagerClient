import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Service, ServiceType} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ServiceService} from "../service.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {

  form?: FormGroup
  service?: Service
  submitted = false
  uSub?: Subscription
  serviceTypes?: ServiceType[]
  tSub?: Subscription

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(70),
        Validators.pattern(/^[A-zА-яієїґІЄЇҐ0-9][A-zА-яієїґІЄЇҐ0-9\s-–,]+$/)]),
      type: new FormControl(null),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(500000)]),
      description: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.tSub = this.serviceService.getAllTypes().subscribe(types => {
      this.serviceTypes = types;
    })

    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.serviceService.getById(params['id'])
      })
    ).subscribe((service: Service) => {
      this.service = service
      this.form = new FormGroup({
        name: new FormControl(service.name, [
          Validators.required,
          Validators.maxLength(70),
          Validators.pattern(environment.SERVICENAME_REGEX)]),
        type: new FormControl(service.serviceTypeName),
        price: new FormControl(service.price, [
          Validators.required,
          Validators.min(1),
          Validators.max(500000)]),
        description: new FormControl(service.description),
      })
    })
  }
  submit(){
    if(this.form?.invalid){
      return
    }

    else{
      let typeServiceId = this.serviceTypes!.find(val => val.name == this.form!.value.type)!.id
      this.submitted = true
      this.uSub = this.serviceService.update({
        id: this.service!.id,
        name: this.form!.value.name,
        serviceTypeName: this.form!.value!.type,
        serviceTypeId: typeServiceId,
        price: this.form!.value.price,
        description : this.form!.value.description
      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/services'])
      })
    }
  }

  ngOnDestroy(): void {
    if(this.uSub){
      this.uSub.unsubscribe()
    }
    this.tSub?.unsubscribe()
  }

}
