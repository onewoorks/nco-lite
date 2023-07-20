import { Component, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { KeycloakService } from 'keycloak-angular';
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
  isLogged          = false
  userInfo          = {};

  constructor(
    private keycloakService: KeycloakService,
    private authService: AuthService,
    private localSt:LocalStorageService
    ) { }
  
  async ngOnInit() {
    this.isLogged = await this.keycloakService.isLoggedIn();
    if(this.isLogged){
      await this.userProfile()
      this.userInfo = this.localSt.retrieve('userinfo');
    } else {
      this.localSt.clear('userinfo');
    }
    
  }

  async userProfile(){
    let userDetails = await this.keycloakService.loadUserProfile();
    this.authService
      .getUserInformation(userDetails)
      .subscribe((data)=>{
        this.getUserRoles(data)
        this.localSt.store('userinfo', data);
      })
  }

  getUserRoles(user: any){
    this.authService
      .getUserRoles(user.id)
      .subscribe((data)=>{
        const userRole = data[0]
        this.localSt.store('uam', userRole.refRoleDesc);
        user.role =  userRole.refRoleDesc
        this.localSt.store('userinfo', user);
      })
  }

  logout() {
    window.location.origin + '/logout'
  }

  
}
