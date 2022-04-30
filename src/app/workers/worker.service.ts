import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {City, ShowOffice, Position, ShowWorker, WorkerFull, EditWorker} from "../shared/interfaces";

@Injectable({ providedIn: 'root' })
export class WorkerService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<ShowWorker[]>(`${environment.serverUrl}worker/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}worker/delete/${id}`)
  }

  getById(id: number): Observable<WorkerFull>{
    return this.http.get<WorkerFull>(`${environment.serverUrl}worker/getById/${id}`)
  }

  getSalaryById(id: number, month: number, year: number): Observable<any>{
    return this.http.get<number>(`${environment.serverUrl}worker/getSalaryById/${id}/${month}/${year}`)
  }

  update(worker: EditWorker): Observable<Worker>{
    return this.http.put<Worker>(`${environment.serverUrl}worker/update`, worker)
  }

  getAllOffices(): Observable<any>{
    return this.http.get<ShowOffice[]>(`${environment.serverUrl}office/getAll`)
  }
  getAllPositions(): Observable<any>{
    return this.http.get<Position[]>(`${environment.serverUrl}position/getAll`)
  }
  getAllCities(): Observable<any>{
    return this.http.get<City[]>(`${environment.serverUrl}city/getAll`)
  }

}
