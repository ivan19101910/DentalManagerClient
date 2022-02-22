import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppointmentPayment, AppointmentStatus} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AppointmentStatusService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<AppointmentStatus[]>(`${environment.serverUrl}appointmentStatus/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}appointmentStatus/delete/${id}`)
  }

  getById(id: number): Observable<AppointmentStatus>{
    return this.http.get<AppointmentStatus>(`${environment.serverUrl}appointmentStatus/getById/${id}`)
  }

  update(appointment: AppointmentStatus): Observable<AppointmentStatus>{
    return this.http.put<AppointmentStatus>(`${environment.serverUrl}appointmentStatus/update`, appointment)
  }

  create(appointmentStatus: AppointmentStatus): Observable<any>{
    return this.http.post(`${environment.serverUrl}appointmentStatus/create`, appointmentStatus)
  }

}
