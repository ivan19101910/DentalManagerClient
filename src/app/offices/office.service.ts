import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateOffice, ShowOffice} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class OfficeService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<ShowOffice[]>(`${environment.serverUrl}office/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}office/delete/${id}`)
  }

  getById(id: number): Observable<ShowOffice>{
    return this.http.get<ShowOffice>(`${environment.serverUrl}office/getById/${id}`)
  }

  update(city: CreateOffice): Observable<ShowOffice>{
    return this.http.put<ShowOffice>(`${environment.serverUrl}office/update`, city)
  }

  create(city: CreateOffice): Observable<any>{
    return this.http.post(`${environment.serverUrl}office/create`, city)
  }

}
