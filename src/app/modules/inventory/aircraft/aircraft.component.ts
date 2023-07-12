import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiInventoryAircraftAircraftService } from 'src/app/service/api/inventory/aircraft/aircraft.service';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {
  @Input() activate: any;
  aircraftType: any = [];
  constructor(
    private inventoryAircraft: ApiInventoryAircraftAircraftService,
    private activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.getDefaultAircraftTypeList('Angkut')
    // console.log(this.activate)
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

}
