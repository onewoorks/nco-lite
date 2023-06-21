import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class ReportInventoryUpdateComponent implements OnInit {
  dailyFields: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.oneDayTable()
  }

  oneDayTable(){
    let totalHours:number = 0
    let cellFields: any = []
    while (totalHours < 24){
      cellFields.push({
        order: totalHours,
        time: String(totalHours.toString()).padStart(2,"0") + "00",
        line: '1 LINE SKI',
        ac_state: 'S',
        status_surveillance: 'svvv', 
        mission_capable: 'mc',
        minutes: 0
      })
      totalHours = totalHours+1
    }
    console.log(cellFields)
    this.dailyFields = cellFields
  }

}
