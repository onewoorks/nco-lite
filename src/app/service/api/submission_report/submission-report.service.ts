import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiSubmissionReportService {
  baseUri: string =  environment.appApiUrl
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) {}

  getDraftReportInventory(inventoryDetail: any){
    const body = {
      id: inventoryDetail.id,
      inventoryType: inventoryDetail.astNavyCategoryDesc.toLowerCase(),
    }
    return this.http.post(`${this.baseUri}/report/submission/draft/inventory`, body)
  } 

  getDraftReport(id: string){
    return this.http.get(`${this.baseUri}/report/submission/draft/${id}`)
  }

  updateReport(report: Object){
    const body = report
    return this.http.put(`${this.baseUri}/report/submission/update`, body).subscribe()
  }

  seacrhReportByDate(inventoryId: String, dateStart: String, dateEnd: String){
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
