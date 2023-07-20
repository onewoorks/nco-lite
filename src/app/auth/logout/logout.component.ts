import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private keycloakService: KeycloakService,
    private localSt: LocalStorageService
    ){}

  ngOnInit() {
    this.localSt.clear('userinfo');
    this.keycloakService.logout(window.location.origin);
  }

}
