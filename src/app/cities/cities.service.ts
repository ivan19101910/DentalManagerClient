import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class CitiesService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<City[]>(`${environment.serverUrl}city/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}city/delete/${id}`)
  }

  getById(id: number): Observable<City>{
    return this.http.get<City>(`${environment.serverUrl}city/getById/${id}`)
  }

  update(city: City): Observable<City>{
    return this.http.put<City>(`${environment.serverUrl}city/update`, city)
  }

  create(city: City): Observable<any>{
    return this.http.post(`${environment.serverUrl}city/create`, city)
  }

}
