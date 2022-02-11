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
    EditAppointmentComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
