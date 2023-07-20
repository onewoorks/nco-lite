import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class ApiInventoryAircraftAircraftService {
  baseUri: string = environment.api.rms_asset
  baseUri_dev: string = environment.appApiUrl + '/aircraft'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  loggedUser: any

  constructor(
    private http: HttpClient,
    private localSt: LocalStorageService) {
      this.loggedUser = this.localSt.retrieve('userinfo')
    }

  getAircraftByRole(){
    return this.http.get(`${this.baseUri}/filtered`)
  }

  getAircraftTypesList(name: String){
    const body = this.localSt.retrieve('uam')
    return this.http.post(`${this.baseUri}/types/list`, body)
  }

  getAircraftByGroup(group: String){
    const body = {
      squadron: this.loggedUser.currentUnit,
      role: this.loggedUser.role,
      group: 'aircraft'
    }
    return this.http.post(`${this.baseUri_dev}/filtered`, body)
  }


  getAircraftCategory(group: String){
    return this.http.get(`${this.baseUri}/v1/ast-atm-categories`)
  }

  getAircraftByCategory(categoryId: String){
    return this.http.get(`${this.baseUri}/v1/ast-atm-categories/${categoryId}/asset-atms`)
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
