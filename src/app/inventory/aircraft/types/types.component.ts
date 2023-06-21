import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  @Output() selectedItem = new EventEmitter<string>();
  AircraftTypes: any = []

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.readAircraftTypes()
  }

  readAircraftTypes(){
    this.apiService.getAircraftTypes().subscribe((data) => {
      this.AircraftTypes = data
    })
  }

  pickItem(value: string) {
    this.selectedItem.emit(value);
  }

}
