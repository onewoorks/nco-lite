import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSubmissionReportService } from 'src/app/service/api/submission_report/submission-report.service'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class ReportInventoryUpdateComponent implements OnInit {
  draftId: string
  dailyFields: Object
  hoursData: any[]
  
  hourFields: any
  
  constructor(
    private route: ActivatedRoute,
    private apiSubmissionReportService: ApiSubmissionReportService
    ) { }

  ngOnInit() {
    this.draftId = this.route.snapshot.paramMap.get('id')
    this.getDraftReport()
  }

  latestOrder(obj){
    let largerOrder = 0;
    let lastOrder: any
    if(obj.length > 1){
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].order > largerOrder) {
          largerOrder = obj[i].order;
          lastOrder   = obj[i]
        }
      }
    } else {
      lastOrder = obj[0]
    }
    return lastOrder
  }

  editRowStatus(data){
    console.log(data)
  }

  deleteRowHour(data, time){
    let hourData = this.dailyFields['data'].find(obj => obj.time === time);
    let hourDataStatus = hourData.data
    let updatedData = hourDataStatus.filter(obj => obj.order !== data.order);
    hourData.data = updatedData
  }

  addNewRowHour(data){
    let hourData = data
    let index       = this.dailyFields['data'].findIndex(obj => obj.order === hourData.order)
    let orderData   = this.dailyFields['data'][index].data
    let lastOrder   = this.latestOrder(orderData)
    let rowData = {
      line: lastOrder.line,
      ac_state: lastOrder.ac_state,
      status_surveillance: lastOrder.status_surveillance,
      mission_capable: lastOrder.mission_capable,
      minutes: 0,
      order: lastOrder.order+1,
    }
    if (index !== -1) {
      this.dailyFields['data'][index].data.push(rowData);
    }
  }

  getDraftReport(){
    this.apiSubmissionReportService.getDraftReport(this.draftId).subscribe((data) =>{
      this.dailyFields = data
    }) 
  }

}
