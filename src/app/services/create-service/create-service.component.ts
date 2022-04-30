import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Service, ServiceType} from "../../shared/interfaces";
import {environment} from "../../../environments/environment";
import {Observable, Subscription} from "rxjs";
import {ServiceService} from "../service.service";

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit, OnDestroy {
  form: FormGroup
  submitted = false
  serviceTypes?: ServiceType[]

  tSub?: Subscription

  constructor(
    public auth: AuthService,
    private serviceService: ServiceService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(70),
        Validators.pattern(environment.SERVICENAME_REGEX)]),
      type: new FormControl(null, Validators.required),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(500000)]),
      description: new FormControl(null)
    })
  }
  ngOnInit(): void {
    this.tSub = this.serviceService.getAllTypes().subscribe(types => {
      this.serviceTypes = types;
    })
  }

  ngOnDestroy(): void {
        this.tSub?.unsubscribe()
    }



  submit() {
    let typeServiceId = this.serviceTypes!.find(val => val.name == this.form.value.type)!.id

    const service: Service = {
      id: 0,
      name: this.form.value.name,
      serviceTypeName: this.form.value.type,
      serviceTypeId: typeServiceId,
      price: this.form.value.price,
      description: this.form.value.description
    }

    const response : any = this.http.post(`${environment.serverUrl}service/create`, service).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/services'])
      this.submitted = false
    })
  }

}
