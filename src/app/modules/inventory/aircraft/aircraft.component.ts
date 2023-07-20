import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiInventoryAircraftAircraftService } from 'src/app/service/api/inventory/aircraft/aircraft.service';
import { LocalStorageService } from 'ngx-webstorage'

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {
  @Input() activate: any;
  aircraftGroup: any;
  aircraftType: any = [];
  inventoryByCategory: any = [];
  loggedUser: any;

  constructor(
    private inventoryAircraft: ApiInventoryAircraftAircraftService,
    private localSt: LocalStorageService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.aircraftGroup = this.route.snapshot.paramMap.get('typeofaircraft')
    this.getInventoryByCategory();
  }

  onTypeSelected(eventData:string){
    this.aircraftType.push(eventData)
    this.getDefaultAircraftTypeList(eventData)
  }

  getDefaultAircraftTypeList(name){
    this.inventoryAircraft.getAircraftTypesList(name).subscribe((data) => {
      this.aircraftType = data
    })
  }

  getInventoryByCategory(){
    this.inventoryAircraft.getAircraftByCategory(this.aircraftGroup).subscribe((data) => {
      this.aircraftType = data
    })
  }
}
