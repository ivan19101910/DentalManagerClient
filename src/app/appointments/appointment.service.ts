import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  AppointmentFull,
  AppointmentServiceCreate,
  CreateAppointment,
  EditAppointment,
  ShortAppointment
} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AppointmentService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<ShortAppointment[]>(`${environment.serverUrl}appointment/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}appointment/delete/${id}`)
  }

  getById(id: number): Observable<AppointmentFull>{
    return this.http.get<AppointmentFull>(`${environment.serverUrl}appointment/getById/${id}`)
  }

  update(appointment: EditAppointment): Observable<EditAppointment>{
    return this.http.put<EditAppointment>(`${environment.serverUrl}appointment/update`, appointment)
  }

  create(appointment: CreateAppointment): Observable<any>{
    return this.http.post(`${environment.serverUrl}appointment/create`, appointment)
  }

  createManyAppointmentServices(appointmentServices: AppointmentServiceCreate[]){
    return this.http.post(`${environment.serverUrl}appointmentService/createMany`, appointmentServices)
  }

  // getAllTypes(): Observable<any>{
  //   return this.http.get<ShortAppointment[]>(`${environment.serverUrl}serviceType/getAll`)
  // }
}
