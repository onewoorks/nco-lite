import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiSubmissionReportService {
  baseUri: string = 'http://localhost:8000/api'
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) {}

  getDraftReportInventory(id: string){
    return this.http.get(`${this.baseUri}/report/submission/draft/inventory/${id}`)
  } 

  getDraftReport(id: string){
    return this.http.get(`${this.baseUri}/report/submission/draft/${id}`)
  }

  updateReport(report: Object){
    const body = report
    return this.http.put(`${this.baseUri}/report/submission/update`, body).subscribe()
  }

  seacrhReportByDate(inventoryId: String, dateStart: String, dateEnd: String){
    console.log(inventoryId)
    const body = {
      inventory_id: inventoryId,
      date_start: dateStart,
      date_end: dateEnd,
    }
    return this.http.post(`${this.baseUri}/report/submission/search-and-update`, body)
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
