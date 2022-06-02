import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SalaryPayment, ShowSalaryPayment} from "../shared/interfaces";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class SalaryPaymentService{

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.http.get<ShowSalaryPayment[]>(`${environment.serverUrl}salaryPayment/getAll`)
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}salaryPayment/delete/${id}`)
  }

  getById(id: number): Observable<ShowSalaryPayment>{
    return this.http.get<ShowSalaryPayment>(`${environment.serverUrl}salaryPayment/getById/${id}`)
  }

  update(payment: SalaryPayment): Observable<SalaryPayment>{
    return this.http.put<SalaryPayment>(`${environment.serverUrl}salaryPayment/update`, payment)
  }

  create(payment: SalaryPayment): Observable<any>{
    return this.http.post(`${environment.serverUrl}SalaryPayment/create`, payment)
  }

}
