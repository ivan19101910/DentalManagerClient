import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TimeSegment} from "../shared/interfaces";

@Injectable({ providedIn: 'root' })
export class TimeSegmentService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<TimeSegment[]>(`${environment.serverUrl}timeSegment/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}timeSegment/delete/${id}`)
  }

  getById(id: number): Observable<TimeSegment>{
    return this.http.get<TimeSegment>(`${environment.serverUrl}timeSegment/getById/${id}`)
  }

  update(timeSegment: TimeSegment): Observable<TimeSegment>{
    return this.http.put<TimeSegment>(`${environment.serverUrl}timeSegment/update`, timeSegment)
  }

  create(timeSegment: TimeSegment): Observable<any>{
    return this.http.post(`${environment.serverUrl}timeSegment/create`, timeSegment)
  }

}
