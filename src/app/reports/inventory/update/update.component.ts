import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSubmissionReportService } from 'src/app/service/api/submission_report/submission-report.service'
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class ReportInventoryUpdateComponent implements OnInit {
  inventoryDetail: any
  inventoryId: string
  draftTime: string
  draftTimeData: Object
  draftId: string
  dailyFields: Object
  hoursData: any[]
  hourFields: any
  rowPick: Number
  rowStatusOrderPick: Number

  constructor(
    private route: ActivatedRoute,
    private apiSubmissionReportService: ApiSubmissionReportService,
    private apiService: ApiService
    ) { }

  ngOnInit() {
    this.draftId = this.route.snapshot.paramMap.get('id')
    this.getDraftReport()
    
  }

  getInventoryDetail(){
    this.apiService.getAircraftById(this.dailyFields['inventory_id']).subscribe((data)=> {
      this.inventoryDetail = data
    })
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

  editRowStatus(time, data, rowNumber, rowStatusOrderPick){
    this.draftTime          = time
    this.draftTimeData      = data
    this.rowPick            = rowNumber
    this.rowStatusOrderPick = rowStatusOrderPick
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
      this.getInventoryDetail()
    }) 
  }

  submitReport(){
    let report        = this.dailyFields
    report['status']  = 'submit'
    // this.apiSubmissionReportService
    //   .seacrhReportByDate(report['inventory_id'], report['report_date'], '2023-06-31')
    //   .subscribe((data)=>{
    //     console.log(data)
    //   })
    this.apiSubmissionReportService.updateReport(report)
    window.location.href = `/reports/inventory/draft/${report['inventory_id']}`
  }

  updateData(){
    let dDate           = this.dailyFields['data']
    let currentPick     = this.rowPick
    let a               = dDate[currentPick]['data']
    let newData         = a.find(o => o.order === this.rowStatusOrderPick);
    dDate.forEach((value,key)=>{
      if(key > currentPick){
        const hourData = {
          line: newData['line'],
          ac_state: newData['ac_state'],
          status_surveillance: newData['status_surveillance'],
          mission_capable: newData['mission_capable'],
          minutes: 60,
          order: this.rowStatusOrderPick,
          line_code_group: `${newData['line']}${newData['ac_state']}${newData['status_surveillance']}${newData['mission_capable']}`.replace(/ /g,'_')
        }
        this.dailyFields['data'][key]['data'] = [hourData]
        console.log(value, hourData)
      }
    })
  }
}
