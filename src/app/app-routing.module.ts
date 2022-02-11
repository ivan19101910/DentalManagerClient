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
import {ServicesComponent} from "./services/services.component";
import {ShowServicesComponent} from "./services/show-services/show-services.component";
import {CreateServiceComponent} from "./services/create-service/create-service.component";
import {EditServiceComponent} from "./services/edit-service/edit-service.component";
import {ShowWorkerComponent} from "./workers/show-worker/show-worker.component";
import {CreateWorkerComponent} from "./workers/create-worker/create-worker.component";
import {EditWorkerComponent} from "./workers/edit-worker/edit-worker.component";
import {AppointmentsComponent} from "./appointments/appointments.component";
import {ShowAppointmentsComponent} from "./appointments/show-appointments/show-appointments.component";
import {CreateAppointmentComponent} from "./appointments/create-appointment/create-appointment.component";
import {EditAppointmentComponent} from "./appointments/edit-appointment/edit-appointment.component";

const routes: Routes = [
  {
    path: "auth", component: AuthComponent
  },
  {
    path: "", component: HomeComponent, canActivate:[AuthGuard]
  },
  {
    path: "workers", component: WorkersComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowWorkerComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreateWorkerComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowWorkerComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditWorkerComponent, canActivate:[AuthGuard]}
    ]
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
    path: "services", component: ServicesComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowServicesComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreateServiceComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowServicesComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditServiceComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "appointments", component: AppointmentsComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowAppointmentsComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreateAppointmentComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowAppointmentsComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditAppointmentComponent, canActivate:[AuthGuard]}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
