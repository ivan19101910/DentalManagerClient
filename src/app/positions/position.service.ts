import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {City, Position} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PositionService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<Position[]>(`${environment.serverUrl}position/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}position/delete/${id}`)
  }

  getById(id: number): Observable<Position>{
    return this.http.get<Position>(`${environment.serverUrl}position/getById/${id}`)
  }

  update(position: Position): Observable<Position>{
    return this.http.put<Position>(`${environment.serverUrl}position/update`, position)
  }

  create(position: Position): Observable<any>{
    return this.http.post(`${environment.serverUrl}position/create`, position)
  }

}
