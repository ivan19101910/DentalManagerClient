import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/interfaces";
import {HttpClient} from "@angular/common/http";
import {sha256} from "js-sha256";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup
  submitted = false

  constructor(
    public auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  ngOnInit(): void {

  }

  submit(){
    this.submitted = true

    const user: User = {
      login: this.form.value.email,
      password: sha256(this.form.value.password)
    }
    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/patients'])
      this.submitted = false
    })
  }
}
