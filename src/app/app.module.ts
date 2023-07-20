import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializeKeycloak } from './auth/keycloak-init';
import {NgxWebstorageModule} from 'ngx-webstorage';

import { AppRoutingModule }   from './app-routing.module';
import { AppComponent }       from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AircraftComponent }  from './modules/inventory/aircraft/aircraft.component';
import { ReportInventoryAircraftComponent } from './reports/inventory/aircraft/aircraft.component'
import { ApiService }         from './service/api.service';
import { TypesComponent }     from './modules/inventory/aircraft/types/types.component';
import { ListComponent }      from './modules/inventory/aircraft/list/list.component';
import { DetailComponent }    from './reports/inventory/aircraft/detail/detail.component';
import { ReportComponent }    from './modules/inventory/aircraft/report/report.component';
import { ReportInventoryUpdateComponent } from './reports/inventory/update/update.component';
import { FormComponent }      from './reports/inventory/update/form/form.component';
import { ReportInventoryDraftComponent } from './reports/inventory/draft/draft.component';
import { InfoComponent }      from './modules/inventory/aircraft/info/info.component';
import { SumPipeModule }      from './helpers/pipe/sum.pipe';
import { ModulesInventoryComponent } from './modules/inventory/inventory.component';
import { SubheaderComponent } from './shared/layout/subheader/subheader.component';
import { SubheaderMenuComponent } from './shared/layout/subheader-menu/subheader-menu.component';

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
    InfoComponent,
    ModulesInventoryComponent,
    SubheaderComponent,
    SubheaderMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule,
    SumPipeModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [ApiService,SumPipeModule,{ 
    provide: APP_INITIALIZER, 
    useFactory: initializeKeycloak, 
    deps: [ KeycloakService ], 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
