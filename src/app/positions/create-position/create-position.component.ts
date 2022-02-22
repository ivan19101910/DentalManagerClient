import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Position} from "../../shared/interfaces";
import {PositionService} from "../position.service";

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.scss']
})
export class CreatePositionComponent implements OnDestroy {

  form: FormGroup
  submitted = false
  cSub?: Subscription

  constructor(
    public auth: AuthService,
    private positionsService: PositionService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      baseRate: new FormControl(null, Validators.required),
      appointmentPercentage: new FormControl(null, Validators.required)
    })
  }

  submit() {
    const position: Position = {
      id: 0,
      positionName: this.form.value.name,
      baseRate: this.form.value.baseRate,
      appointmentPercentage: this.form.value.appointmentPercentage
    }

    this.cSub = this.positionsService.create(position).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/positions'])
      this.submitted = false
    })
  }

  ngOnDestroy(): void {
    if(this.cSub){
      this.cSub.unsubscribe()
    }
  }

}
