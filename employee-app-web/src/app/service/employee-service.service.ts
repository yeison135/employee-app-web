import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class EmployeeServiceService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private baseurl = "http://localhost:8081/employee";

  constructor(private http: HttpClient) { }
  public getEmployees(): any {
    return this.http.get(this.baseurl + "/all");
  }

  public addEmployee(data): Observable<any> {
    return this.http.post<any>(this.baseurl + '/add', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  public deleteEmployee(data): Observable<any> {
    return this.http.post<any>(this.baseurl + '/delete', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  public updateEmployee(data): Observable<any> {
    return this.http.post<any>(this.baseurl + '/delete', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
