import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {
  aircraftType: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getDefaultAircraftTypeList('Angkut')
  }

  onTypeSelected(eventData:string){
    this.aircraftType.push(eventData)
    this.getDefaultAircraftTypeList(eventData)
  }

  getDefaultAircraftTypeList(name){
    this.apiService.getAircraftTypesList(name).subscribe((data) => {
      this.aircraftType = data
    // return data
    })
  }

}
