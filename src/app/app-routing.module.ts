import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkersComponent} from "./workers/workers.component";
import {PatientsComponent} from "./patients/patients.component";
import {HomeComponent} from "./home/home.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {CreatePatientComponent} from "./patients/components/create-patient/create-patient.component";
import {ShowPatientsComponent} from "./patients/components/show-patients/show-patients.component";
import {EditPatientComponent} from "./patients/components/edit-patient/edit-patient.component";

const routes: Routes = [
  {
    path: "auth", component: AuthComponent
  },
  {
    path: "", component: HomeComponent, canActivate:[AuthGuard]
  },
  {
    path: "workers", component: WorkersComponent, canActivate:[AuthGuard]
  },
  {
    path: "patients", component: PatientsComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowPatientsComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreatePatientComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowPatientsComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditPatientComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "create", component: CreatePatientComponent, canActivate:[AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }