import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Day} from "../shared/interfaces";

@Injectable({ providedIn: 'root' })
export class DayService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<Day[]>(`${environment.serverUrl}day/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}day/delete/${id}`)
  }

  getById(id: number): Observable<Day>{
    return this.http.get<Day>(`${environment.serverUrl}day/getById/${id}`)
  }

  update(day: Day): Observable<Day>{
    return this.http.put<Day>(`${environment.serverUrl}day/update`, day)
  }

  create(day: Day): Observable<any>{
    return this.http.post(`${environment.serverUrl}day/create`, day)
  }

}
