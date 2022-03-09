import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppointmentStatus, WorkerSchedule} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class WorkerScheduleService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<WorkerSchedule[]>(`${environment.serverUrl}workerSchedule/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}workerSchedule/delete/${id}`)
  }

  getById(id: number): Observable<WorkerSchedule>{
    return this.http.get<WorkerSchedule>(`${environment.serverUrl}workerSchedule/getById/${id}`)
  }

  update(appointment: WorkerSchedule): Observable<WorkerSchedule>{
    return this.http.put<WorkerSchedule>(`${environment.serverUrl}workerSchedule/update`, appointment)
  }

  create(appointmentStatus: WorkerSchedule): Observable<any>{
    return this.http.post(`${environment.serverUrl}workerSchedule/create`, appointmentStatus)
  }

}
