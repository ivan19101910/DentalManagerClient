import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkersComponent } from './workers/workers.component';
import { PatientsComponent } from './patients/patients.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patients/components/patient/patient.component';
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreatePatientComponent } from './patients/components/create-patient/create-patient.component';
import { ShowPatientsComponent } from './patients/components/show-patients/show-patients.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import { EditPatientComponent } from './patients/components/edit-patient/edit-patient.component';
import {NgxPaginationModule} from "ngx-pagination";
import { ServicesComponent } from './services/services.component';
import { ShowServicesComponent } from './services/show-services/show-services.component';
import { EditServiceComponent } from './services/edit-service/edit-service.component';
import { CreateServiceComponent } from './services/create-service/create-service.component';
import { CreateWorkerComponent } from './workers/create-worker/create-worker.component';
import { EditWorkerComponent } from './workers/edit-worker/edit-worker.component';
import { ShowWorkerComponent } from './workers/show-worker/show-worker.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ShowAppointmentsComponent } from './appointments/show-appointments/show-appointments.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
import { EditAppointmentComponent } from './appointments/edit-appointment/edit-appointment.component';
import { AppointmentPaymentsComponent } from './appointment-payments/appointment-payments.component';
import { CreateAppointmentPaymentComponent } from './appointment-payments/create-appointment-payment/create-appointment-payment.component';
import { EditAppointmentPaymentComponent } from './appointment-payments/edit-appointment-payment/edit-appointment-payment.component';
import { ShowAppointmentPaymentsComponent } from './appointment-payments/show-appointment-payments/show-appointment-payments.component';
import { AppointmentStatusesComponent } from './appointment-statuses/appointment-statuses.component';
import { CreateAppointmentStatusComponent } from './appointment-statuses/create-appointment-status/create-appointment-status.component';
import { EditAppointmentStatusComponent } from './appointment-statuses/edit-appointment-status/edit-appointment-status.component';
import { ShowAppointmentStatusesComponent } from './appointment-statuses/show-appointment-statuses/show-appointment-statuses.component';
import { CitiesComponent } from './cities/cities.component';
import { CreateCityComponent } from './cities/create-city/create-city.component';
import { EditCityComponent } from './cities/edit-city/edit-city.component';
import { ShowCitiesComponent } from './cities/show-cities/show-cities.component';
import { PositionsComponent } from './positions/positions.component';
import { CreatePositionComponent } from './positions/create-position/create-position.component';
import { EditPositionComponent } from './positions/edit-position/edit-position.component';
import { ShowPositionsComponent } from './positions/show-positions/show-positions.component';
import { OfficesComponent } from './offices/offices.component';
import { CreateOfficeComponent } from './offices/create-office/create-office.component';
import { EditOfficeComponent } from './offices/edit-office/edit-office.component';
import { ShowOfficesComponent } from './offices/show-offices/show-offices.component';
import { SalaryPaymentsComponent } from './salary-payments/salary-payments.component';
import { EditSalaryPaymentComponent } from './salary-payments/edit-salary-payment/edit-salary-payment.component';
import { ShowSalaryPaymentsComponent } from './salary-payments/show-salary-payments/show-salary-payments.component';
import {CreateSalaryPaymentComponent} from "./salary-payments/create-salary-payment/create-salary-payment.component";
import { SchedulesComponent } from './schedules/schedules.component';
import { CreateScheduleComponent } from './schedules/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './schedules/edit-schedule/edit-schedule.component';
import { ShowSchedulesComponent } from './schedules/show-schedules/show-schedules.component';
import { DayComponent } from './day/day.component';
import { TimeSegmentComponent } from './time-segment/time-segment.component';
import { WorkerSchedulesComponent } from './worker-schedules/worker-schedules.component';
import { CreateWorkerScheduleComponent } from './worker-schedules/create-worker-schedule/create-worker-schedule.component';
import { EditWorkerScheduleComponent } from './worker-schedules/edit-worker-schedule/edit-worker-schedule.component';
import { ShowWorkerSchedulesComponent } from './worker-schedules/show-worker-schedules/show-worker-schedules.component';
import { ShowDetailsAppointmentComponent } from './appointments/show-details-appointment/show-details-appointment.component';
import { ShowDetailsWorkerComponent } from './workers/show-details-worker/show-details-worker.component';
import { ShowDetailsPatientComponent } from './patients/components/show-details-patient/show-details-patient.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    WorkersComponent,
    PatientsComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent,
    PatientComponent,
    CreatePatientComponent,
    ShowPatientsComponent,
    EditPatientComponent,
    ServicesComponent,
    ShowServicesComponent,
    EditServiceComponent,
    CreateServiceComponent,
    CreateWorkerComponent,
    EditWorkerComponent,
    ShowWorkerComponent,
    AppointmentsComponent,
    ShowAppointmentsComponent,
    CreateAppointmentComponent,
    EditAppointmentComponent,
    AppointmentPaymentsComponent,
    CreateAppointmentPaymentComponent,
    EditAppointmentPaymentComponent,
    ShowAppointmentPaymentsComponent,
    AppointmentStatusesComponent,
    CreateAppointmentStatusComponent,
    EditAppointmentStatusComponent,
    ShowAppointmentStatusesComponent,
    CitiesComponent,
    CreateCityComponent,
    EditCityComponent,
    ShowCitiesComponent,
    PositionsComponent,
    CreatePositionComponent,
    EditPositionComponent,
    ShowPositionsComponent,
    OfficesComponent,
    CreateOfficeComponent,
    EditOfficeComponent,
    ShowOfficesComponent,
    SalaryPaymentsComponent,
    CreateSalaryPaymentComponent,
    EditSalaryPaymentComponent,
    ShowSalaryPaymentsComponent,
    SchedulesComponent,
    CreateScheduleComponent,
    EditScheduleComponent,
    ShowSchedulesComponent,
    DayComponent,
    TimeSegmentComponent,
    WorkerSchedulesComponent,
    CreateWorkerScheduleComponent,
    EditWorkerScheduleComponent,
    ShowWorkerSchedulesComponent,
    ShowDetailsAppointmentComponent,
    ShowDetailsWorkerComponent,
    ShowDetailsPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
