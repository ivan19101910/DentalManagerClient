import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {City, Position} from "../../shared/interfaces";
import {Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CitiesService} from "../../cities/cities.service";
import {PositionService} from "../position.service";

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent implements OnInit, OnDestroy {

  form?: FormGroup
  position?: Position
  submitted = false
  eSub?: Subscription

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.getById(params['id'])
      })
    ).subscribe((position: Position) => {
      this.position = position
      this.form = new FormGroup({
        name: new FormControl(position.positionName, Validators.required),
        baseRate: new FormControl(position.baseRate, Validators.required),
        appointmentPercentage: new FormControl(position.appointmentPercentage, Validators.required)
      })

    })

  }
  submit(){
    if(this.form?.invalid){
      return
    }

    else{
      this.submitted = true
      this.eSub = this.positionsService.update({
        id: this.position!.id,
        positionName: this.form!.value.name,
        baseRate: this.form!.value.baseRate,
        appointmentPercentage: this.form!.value.appointmentPercentage
      }).subscribe(() => {
        this.submitted = false
        this.router.navigate(['/positions'])
      })
    }
  }

  ngOnDestroy(): void {
    if(this.eSub){
      this.eSub.unsubscribe()
    }
  }

}
