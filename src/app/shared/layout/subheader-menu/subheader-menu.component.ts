import { Component } from '@angular/core';
import { ApiInventoryAircraftAircraftService } from 'src/app/service/api/inventory/aircraft/aircraft.service';

@Component({
  selector: 'app-subheader-menu',
  templateUrl: './subheader-menu.component.html',
  styleUrls: ['./subheader-menu.component.css']
})
export class SubheaderMenuComponent {
  listMainAsset: any = []
  constructor(
    private apiAircraft: ApiInventoryAircraftAircraftService
  ){}

  ngOnInit(){
    this.getAircraftCategory()
  }

  getAircraftCategory(){
    this.apiAircraft.getAircraftCategory('').subscribe((data) => {
      this.listMainAsset = data
    })
  }
}
