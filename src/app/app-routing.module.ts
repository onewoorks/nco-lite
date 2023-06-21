import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AircraftComponent } from './inventory/aircraft/aircraft.component'
import { ReportInventoryAircraftComponent } from './reports/inventory/aircraft/aircraft.component'
import { ReportInventoryUpdateComponent } from './reports/inventory/update/update.component'

const routes: Routes = [
  { path: 'inventory/aircraft', component:AircraftComponent},
  { path: 'reports/inventory/aircraft/:id', component: ReportInventoryAircraftComponent},
  { path: 'reports/inventory/update/:id', component: ReportInventoryUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
