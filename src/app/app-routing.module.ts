import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from './auth/auth.guard';
import { KeycloakService } from 'keycloak-angular';

import { AircraftComponent } from './modules/inventory/aircraft/aircraft.component'
import { ReportInventoryAircraftComponent } from './reports/inventory/aircraft/aircraft.component'
import { ReportInventoryUpdateComponent } from './reports/inventory/update/update.component'
import { ReportInventoryDraftComponent } from './reports/inventory/draft/draft.component'
import { ModulesInventoryComponent }      from './modules/inventory/inventory.component'
import { LogoutComponent } from './auth/logout/logout.component'

const routes: Routes = [
  { path: '', component:ModulesInventoryComponent},
  { path: 'logout', component:LogoutComponent},
  { path: 'inventory/:typeofaircraft', component:AircraftComponent},
  { path: 'reports/inventory/aircraft/:id', component: ReportInventoryAircraftComponent},
  { path: 'reports/inventory/update/:id', component: ReportInventoryUpdateComponent},
  { path: 'reports/inventory/draft/:id', component: ReportInventoryDraftComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule {}
