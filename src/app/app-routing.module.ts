import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AircraftComponent } from './inventory/aircraft/aircraft.component'
import { ReportInventoryAircraftComponent } from './reports/inventory/aircraft/aircraft.component'
import { ReportInventoryUpdateComponent } from './reports/inventory/update/update.component'
import { ReportInventoryDraftComponent } from './reports/inventory/draft/draft.component'

const routes: Routes = [
  { path: 'inventory/aircraft', component:AircraftComponent},
  { path: 'reports/inventory/aircraft/:id', component: ReportInventoryAircraftComponent},
  { path: 'reports/inventory/update/:id', component: ReportInventoryUpdateComponent},
  { path: 'reports/inventory/draft/:id', component: ReportInventoryDraftComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
