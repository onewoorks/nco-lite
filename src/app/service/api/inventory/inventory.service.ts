import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  baseUri: string = environment.appApiUrl
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient,
    private localSt: LocalStorageService) {}

  getInventories(){
    const uam = this.localSt.retrieve('uam')
    return this.http.get(`${this.baseUri}/inventory/lists`)
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