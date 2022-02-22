import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {City, CreateOffice, SalaryPayment, ShowWorker} from "../../shared/interfaces";
import {AuthService} from "../../shared/services/auth.service";
import {OfficeService} from "../../offices/office.service";
import {CitiesService} from "../../cities/cities.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SalaryPaymentService} from "../salary-payment.service";
import {WorkerService} from "../../workers/worker.service";

@Component({
  selector: 'app-create-salary-payment',
  templateUrl: './create-salary-payment.component.html',
  styleUrls: ['./create-salary-payment.component.scss']
})
export class CreateSalaryPaymentComponent implements OnDestroy {

  form: FormGroup
  submitted = false
  cSub?: Subscription
  wSub?: Subscription
  workerId?: number
  workers?: ShowWorker[]

  constructor(
    public auth: AuthService,
    private salaryPaymentService: SalaryPaymentService,
    private workerService: WorkerService,
    private router: Router,
    private http: HttpClient
  ) {
    this.wSub = workerService.getAll().subscribe(cities => {
      this.workers = cities;
    })

    this.form = new FormGroup({
      monthNumber: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      worker: new FormControl(null, Validators.required),
    })
  }

  submit() {
    const payment: SalaryPayment = {
      id: 0,
      transactionNumber: 0,
      monthNumber: this.form.value.monthNumber,
      year: this.form.value.year,
      amount: this.form.value.amount,
      workerId: this.workerId!
    }

    this.cSub = this.salaryPaymentService.create(payment).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/salaryPayments'])
      this.submitted = false
    })
  }

  ngOnDestroy(): void {
    if(this.cSub){
      this.cSub.unsubscribe()
    }
  }

}
