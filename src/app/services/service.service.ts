import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Service, ServiceType} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ServiceService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{

    return this.http.get<Service[]>(`${environment.serverUrl}service/getAll`)

  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}service/delete/${id}`)
  }

  getById(id: number): Observable<Service>{
    return this.http.get<Service>(`${environment.serverUrl}service/get-by-id/${id}`)
  }

  update(service: Service): Observable<Service>{
    return this.http.put<Service>(`${environment.serverUrl}service/update`, service)
  }

  getAllTypes(): Observable<any>{
    return this.http.get<ServiceType[]>(`${environment.serverUrl}serviceType/getAll`)
  }
}
