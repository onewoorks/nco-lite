import { Component, OnInit, Input } from '@angular/core';
import {DailyreportService} from 'src/app/service/api/dailyreport/dailyreport.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() inventory_id: ''
  reportData: any = []
  constructor(private dailyReportService: DailyreportService) { }

  ngOnInit( ) {
    this.getReportForInventory()
  }

  getReportForInventory(){
    this.dailyReportService.getDailyReport(this.inventory_id).subscribe((data)=> {
      this.reportData = data;
    })
  }


}
