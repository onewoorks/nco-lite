import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri: string = environment.appApiUrl
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) {}

  getAircraftTypes(){
    return this.http.get(`${this.baseUri}/aircraft/types`)
  }

  getAircraftTypesList(name: String){
    return this.http.get(`${this.baseUri}/aircraft/types/list/${name}`)
  }

  getAircraftById(id: String){
    return this.http.get(`${this.baseUri}/aircraft/id/${id}`)
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
