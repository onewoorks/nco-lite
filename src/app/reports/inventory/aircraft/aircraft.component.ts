import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class ReportInventoryAircraftComponent implements OnInit {
  inventory_id: string;
  inventoryDetail:any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.inventory_id = this.route.snapshot.paramMap.get('id')
    this.getInventoryDetail()
  }

  getInventoryDetail(){
    this.apiService.getAircraftById(this.inventory_id).subscribe((data)=>{
      this.inventoryDetail = data
      console.log(data)
    })
  }

}
