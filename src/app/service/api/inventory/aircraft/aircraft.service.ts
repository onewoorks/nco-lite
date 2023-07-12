import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class ApiInventoryAircraftAircraftService {
  baseUri: string = environment.appApiUrl + '/aircraft'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  userrole: any = {}

  constructor(
    private http: HttpClient,
    private localSt: LocalStorageService) {}

  getAircraftByRole(){
    return this.http.get(`${this.baseUri}/filtered`)
  }

  getAircraftTypesList(name: String){
    const body = this.localSt.retrieve('uae')
    return this.http.post(`${this.baseUri}/types/list`, body)
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
