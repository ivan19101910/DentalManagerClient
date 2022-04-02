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
import {AppointmentPaymentsComponent} from "./appointment-payments/appointment-payments.component";
import {
  ShowAppointmentPaymentsComponent
} from "./appointment-payments/show-appointment-payments/show-appointment-payments.component";
import {
  CreateAppointmentPaymentComponent
} from "./appointment-payments/create-appointment-payment/create-appointment-payment.component";
import {
  EditAppointmentPaymentComponent
} from "./appointment-payments/edit-appointment-payment/edit-appointment-payment.component";
import {AppointmentStatusesComponent} from "./appointment-statuses/appointment-statuses.component";
import {
  ShowAppointmentStatusesComponent
} from "./appointment-statuses/show-appointment-statuses/show-appointment-statuses.component";
import {
  CreateAppointmentStatusComponent
} from "./appointment-statuses/create-appointment-status/create-appointment-status.component";
import {
  EditAppointmentStatusComponent
} from "./appointment-statuses/edit-appointment-status/edit-appointment-status.component";
import {CitiesComponent} from "./cities/cities.component";
import {ShowCitiesComponent} from "./cities/show-cities/show-cities.component";
import {CreateCityComponent} from "./cities/create-city/create-city.component";
import {EditCityComponent} from "./cities/edit-city/edit-city.component";
import {PositionsComponent} from "./positions/positions.component";
import {ShowPositionsComponent} from "./positions/show-positions/show-positions.component";
import {CreatePositionComponent} from "./positions/create-position/create-position.component";
import {EditPositionComponent} from "./positions/edit-position/edit-position.component";
import {OfficesComponent} from "./offices/offices.component";
import {ShowOfficesComponent} from "./offices/show-offices/show-offices.component";
import {CreateOfficeComponent} from "./offices/create-office/create-office.component";
import {EditOfficeComponent} from "./offices/edit-office/edit-office.component";
import {SalaryPaymentsComponent} from "./salary-payments/salary-payments.component";
import {ShowSalaryPaymentsComponent} from "./salary-payments/show-salary-payments/show-salary-payments.component";
import {CreateSalaryPaymentComponent} from "./salary-payments/create-salary-payment/create-salary-payment.component";
import {EditSalaryPaymentComponent} from "./salary-payments/edit-salary-payment/edit-salary-payment.component";
import {SchedulesComponent} from "./schedules/schedules.component";
import {ShowSchedulesComponent} from "./schedules/show-schedules/show-schedules.component";
import {CreateScheduleComponent} from "./schedules/create-schedule/create-schedule.component";
import {EditScheduleComponent} from "./schedules/edit-schedule/edit-schedule.component";
import {WorkerSchedulesComponent} from "./worker-schedules/worker-schedules.component";
import {ShowWorkerSchedulesComponent} from "./worker-schedules/show-worker-schedules/show-worker-schedules.component";
import {
  CreateWorkerScheduleComponent
} from "./worker-schedules/create-worker-schedule/create-worker-schedule.component";
import {EditWorkerScheduleComponent} from "./worker-schedules/edit-worker-schedule/edit-worker-schedule.component";
import {
  ShowDetailsAppointmentComponent
} from "./appointments/show-details-appointment/show-details-appointment.component";
import {ShowDetailsWorkerComponent} from "./workers/show-details-worker/show-details-worker.component";
import {ShowDetailsPatientComponent} from "./patients/components/show-details-patient/show-details-patient.component";

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
      {path: 'edit/:id', component: EditWorkerComponent, canActivate:[AuthGuard]},
      {path: 'details/:id', component: ShowDetailsWorkerComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "patients", component: PatientsComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowPatientsComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreatePatientComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowPatientsComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditPatientComponent, canActivate:[AuthGuard]},
      {path: 'details/:id', component: ShowDetailsPatientComponent, canActivate:[AuthGuard]}
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
      {path: 'edit/:id', component: EditAppointmentComponent, canActivate:[AuthGuard]},
      {path: 'details/:id', component: ShowDetailsAppointmentComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "appointmentPayments", component: AppointmentPaymentsComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowAppointmentPaymentsComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreateAppointmentPaymentComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowAppointmentPaymentsComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditAppointmentPaymentComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "appointmentStatuses", component: AppointmentStatusesComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowAppointmentStatusesComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreateAppointmentStatusComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowAppointmentStatusesComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditAppointmentStatusComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "cities", component: CitiesComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowCitiesComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreateCityComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowCitiesComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditCityComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "positions", component: PositionsComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowPositionsComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreatePositionComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowPositionsComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditPositionComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "offices", component: OfficesComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowOfficesComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreateOfficeComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowOfficesComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditOfficeComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "salaryPayments", component: SalaryPaymentsComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowSalaryPaymentsComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreateSalaryPaymentComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowSalaryPaymentsComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditSalaryPaymentComponent, canActivate:[AuthGuard]}
    ]
  },
  {
    path: "schedules", component: SchedulesComponent, canActivate:[AuthGuard], children: [
      {path: '', component: ShowSchedulesComponent, canActivate:[AuthGuard]},
      {path: 'create', component: CreateScheduleComponent, canActivate:[AuthGuard]},
      {path: 'getAll', component: ShowSchedulesComponent, canActivate:[AuthGuard]},
      {path: 'edit/:id', component: EditScheduleComponent, canActivate:[AuthGuard]}
    ]
  }
  // {
  //   path: "workerSchedules", component: WorkerSchedulesComponent, canActivate:[AuthGuard], children: [
  //     {path: '', component: ShowWorkerSchedulesComponent, canActivate:[AuthGuard]},
  //     {path: 'create', component: CreateWorkerScheduleComponent, canActivate:[AuthGuard]},
  //     {path: 'getAll', component: ShowWorkerSchedulesComponent, canActivate:[AuthGuard]},
  //     {path: 'edit/:id', component: EditWorkerScheduleComponent, canActivate:[AuthGuard]}
  //   ]
  // }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
