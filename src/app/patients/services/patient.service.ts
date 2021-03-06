import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "../../shared/interfaces";
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PatientService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{

    return this.http.get<Patient[]>(`${environment.serverUrl}patient/getAll`)

  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}Patient/delete/${id}`)
  }

  getById(id: number): Observable<Patient>{
    return this.http.get<Patient>(`${environment.serverUrl}patient/get-by-id/${id}`)
  }

  update(patient: Patient): Observable<Patient>{
    return this.http.put<Patient>(`${environment.serverUrl}patient/update`, patient)
  }

}
