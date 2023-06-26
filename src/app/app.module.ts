import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AircraftComponent } from './inventory/aircraft/aircraft.component';
import { ReportInventoryAircraftComponent } from './reports/inventory/aircraft/aircraft.component'
import { ApiService } from './service/api.service';
import { TypesComponent } from './inventory/aircraft/types/types.component';
import { ListComponent } from './inventory/aircraft/list/list.component';
import { DetailComponent } from './reports/inventory/aircraft/detail/detail.component';
import { ReportComponent } from './inventory/aircraft/report/report.component';
import { ReportInventoryUpdateComponent } from './reports/inventory/update/update.component';
import { FormComponent } from './reports/inventory/update/form/form.component';
import { ReportInventoryDraftComponent } from './reports/inventory/draft/draft.component';
import { InfoComponent } from './inventory/aircraft/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    AircraftComponent,
    ReportInventoryAircraftComponent,
    TypesComponent,
    ListComponent,
    DetailComponent,
    ReportComponent,
    ReportInventoryUpdateComponent,
    FormComponent,
    ReportInventoryDraftComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
