import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUri: string = environment.api.uam
  baseUri_dev: string = environment.appApiUrl
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(
    private http: HttpClient) {}

  getUserInformation(user: any){
    return this.http.get(`${this.baseUri_dev}/auth/user/${user.username}`)
  }

  getUserRoles(userid: String){
    return this.http.get(`${this.baseUri}/v1/users/${userid.toLowerCase()}/user-roles`)
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
