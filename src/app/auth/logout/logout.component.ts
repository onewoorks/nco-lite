import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private keycloakService: KeycloakService
    ){}

  ngOnInit() {
    this.keycloakService.logout(window.location.origin);
  }

}
