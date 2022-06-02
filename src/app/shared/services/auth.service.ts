import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthResponse, User} from "../interfaces";
import {catchError, Observable, Subject, throwError} from "rxjs";
import {tap} from "rxjs/operators"

@Injectable({providedIn:'root'})
export class AuthService{
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }
  get token(): string | null {
    return localStorage.getItem("token")
  }

  login(worker: User): Observable<any>{

    return this.http.post('https://localhost:7115/worker/authenticate', worker)
      .pipe(
        tap<any>(this.setToken),
        catchError<any, any>(this.handleError.bind(this))
      )
  }

  logout(){
    this.setToken(null)
  }

  isAuthenticated(): boolean{
    return !! this.token
  }
  private handleError(error: HttpErrorResponse){
    const {message} = error.error
    switch(message){
      case "Username or password is incorrect":
        this.error$.next('Неправильний пароль чи логін')
        break
      case "Username or password is incorrect":
        break
      case "Username or password is incorrect":
        break
    }
    return throwError(error)
  }

  private setToken(response: AuthResponse | null){
    if(response){
      localStorage.setItem("token", response.token)
      localStorage.setItem("id", response.id.toString())
    }
    else{
      localStorage.clear()

    }
  }
}
