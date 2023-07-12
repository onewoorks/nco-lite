import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/service/auth/auth.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String     = 'NCO Lite development';
  appApiUrl: String = environment.appApiUrl
  isLogged = false

  constructor(
    private keycloakService: KeycloakService,
    private authService: AuthService,
    private localSt:LocalStorageService
    ) { }
  
  async ngOnInit() {
    this.isLogged = await this.keycloakService.isLoggedIn();
    if(this.isLogged){
      this.userProfile()
    }
  }

  
  async userProfile(){
    let userDetails = await this.keycloakService.loadUserProfile();
    this.authService
      .getUserRoles(userDetails.username)
      .subscribe((data)=>{
        this.localSt.store('uae', data);
      })
  }

  logout() {
    window.location.origin + '/logout'
  }

  
}
