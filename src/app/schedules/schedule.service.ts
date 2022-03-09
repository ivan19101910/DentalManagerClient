import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateSchedule, ShowSchedule} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class SchedulesService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<ShowSchedule[]>(`${environment.serverUrl}schedule/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}schedule/delete/${id}`)
  }

  getById(id: number): Observable<ShowSchedule>{
    return this.http.get<ShowSchedule>(`${environment.serverUrl}schedule/getById/${id}`)
  }

  update(schedule: CreateSchedule): Observable<ShowSchedule>{
    return this.http.put<ShowSchedule>(`${environment.serverUrl}schedule/update`, schedule)
  }

  create(schedule: CreateSchedule): Observable<any>{
    return this.http.post(`${environment.serverUrl}schedule/create`, schedule)
  }

}
