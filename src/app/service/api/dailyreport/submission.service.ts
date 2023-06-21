import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  baseUri: string = 'http://localhost:8000/api'
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) {}

  addSubmission(inventory_id){
    console.log('ready to submit')
    // return this.http.post(`${this.baseUri}/daily-report-submission/inventory/${inventory_id}`)
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
