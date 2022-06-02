import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShowSalaryPayment, ShowWorker} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SalaryPaymentService} from "../salary-payment.service";
import {WorkerService} from "../../workers/worker.service";

@Component({
  selector: 'app-edit-salary-payment',
  templateUrl: './edit-salary-payment.component.html',
  styleUrls: ['./edit-salary-payment.component.scss']
})
export class EditSalaryPaymentComponent implements OnInit, OnDestroy {

  form?: FormGroup
  payment?: ShowSalaryPayment
  submitted = false
  eSub?: Subscription
  wSub?: Subscription
  workerId?: number
  workers?: ShowWorker[]
  salary?: number = 0

  constructor(
    private route: ActivatedRoute,
    private salaryPaymentService: SalaryPaymentService,
    private workerService: WorkerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.salaryPaymentService.getById(params['id'])
      })
    ).subscribe((payment: ShowSalaryPayment) => {
      this.payment = payment
      this.form = new FormGroup({
        monthNumber: new FormControl(payment.monthNumber, Validators.required),
        year: new FormControl(payment.year, Validators.required),
        amount: new FormControl(payment.amount, Validators.required),
        worker: new FormControl(null, Validators.required),
      })
      this.workerId = payment.workerId
      this.salary = payment.amount
    })
    this.wSub = this.workerService.getAll().subscribe(workers => {
      this.workers = workers;
    })
  }
  getSalary(): void{
    if(this.form!.value.monthNumber && this.form!.value.year)
    {
      this.workerService.getSalaryById(this.workerId!, this.form!.value.monthNumber, this.form!.value.year).subscribe(salary =>{
        this.salary = salary
        this.form!.controls['amount'].setErrors(null)
      })
    }
  }
  submit(){
    if(this.form?.invalid){
      return
    }

    else{
      this.submitted = true
      this.eSub = this.salaryPaymentService.update({
        id: this.payment!.id,
        transactionNumber: 0,
        monthNumber: this.form!.value.monthNumber,
        year: this.form!.value.year,
        amount: this.form!.value.amount,
        workerId: this.workerId!

      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/salaryPayments'])
      })
    }
  }

  ngOnDestroy(): void {
    if(this.eSub){
      this.eSub.unsubscribe()
    }
  }

}
