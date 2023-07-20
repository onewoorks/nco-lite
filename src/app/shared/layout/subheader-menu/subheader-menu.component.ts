import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiInventoryAircraftAircraftService } from 'src/app/service/api/inventory/aircraft/aircraft.service';

@Component({
  selector: 'app-subheader-menu',
  templateUrl: './subheader-menu.component.html',
  styleUrls: ['./subheader-menu.component.css']
})
export class SubheaderMenuComponent {
  listMainAsset: any = []
  inventoryId: String
  constructor(
    private apiAircraft: ApiInventoryAircraftAircraftService,
    private route: ActivatedRoute
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
