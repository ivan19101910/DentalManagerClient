import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppointmentPayment} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AppointmentPaymentService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<AppointmentPayment[]>(`${environment.serverUrl}appointmentPayment/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}appointmentPayment/delete/${id}`)
  }

  getById(id: number): Observable<AppointmentPayment>{
    return this.http.get<AppointmentPayment>(`${environment.serverUrl}appointmentPayment/getById/${id}`)
  }

  update(appointment: AppointmentPayment): Observable<AppointmentPayment>{
    return this.http.put<AppointmentPayment>(`${environment.serverUrl}appointmentPayment/update`, appointment)
  }

  create(appointment: AppointmentPayment): Observable<any>{
    return this.http.post(`${environment.serverUrl}appointmentPayment/create`, appointment)
  }

}
