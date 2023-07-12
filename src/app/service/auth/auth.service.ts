import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUri: string = environment.appApiUrl
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(
    private http: HttpClient) {}

  getUserRoles(role: String){
    const body = {
      userrole: role
    }
    return this.http.post(`${this.baseUri}/auth/role`, body)
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
