import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSubmissionReportService } from 'src/app/service/api/submission_report/submission-report.service'
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class ReportInventoryDraftComponent implements OnInit {
  inventory_id: string;
  draftReport: any = [];
  inventoryDetail: any

  constructor(
    private apiSubmissionReportService: ApiSubmissionReportService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.inventory_id = this.route.snapshot.paramMap.get('id')
    this.renderReportSubmission()
    this.getInventoryDetail()
  }

  getInventoryDetail(){
    this.apiService.getAircraftById(this.inventory_id).subscribe((data)=> {
      this.inventoryDetail = data
    })
  }

  renderReportSubmission(){
    this.apiSubmissionReportService.getDraftReportInventory(this.inventory_id).subscribe((data) => {
      // this.draftReport = data
      this.reportData(data)
    })
  }

  updateReport(draft_id: string){
    window.location.href = `reports/inventory/update/${draft_id}`
  }

  statusDataA(status: any[]){
    let statusData  = []
    let rowData = []
    status.forEach((value, key)=>{
      rowData.push({
        line: value.data[0].line,
        ac_state: value.data[0].ac_state,
        status_surveillance: value.data[0].status_surveillance,
        mission_capable: value.data[0].mission_capable
      })
    }) 
    statusData.push(rowData)
    console.log(statusData)
    return statusData
  }

  createOrAppend(obj, key, value) {
    if (obj.hasOwnProperty(key)) {
      // Key exists, append the value
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      // Key does not exist, create a new key-value pair
      obj[key] = value;
    }
    return obj
  }

  statusData(status){
    let statusData  = [];
    let maxLen        = 0;
    let line_data    = {};
    
    status.forEach((value,key)=>{
      if(value.data.length > maxLen){
        maxLen = value.data.length
      }
    })

    let i = 0

    while(i < maxLen){
      let raw     = status[0]
      statusData  = raw.data
      let hour    = []
      status.forEach((d,s)=>{
        let a = {}
        let orderId = 0
        let minutes = 0
        if (typeof d.data[i] !== 'undefined'){
          orderId = (typeof d.data[i].order !== 'undefined') ? d.data[i].order : 0
          minutes = (typeof d.data[i].minutes !== 'undefined') ? d.data[i].minutes : 0
        }
        a[orderId] = minutes
        hour.push(a)
      })
      statusData[i]['hour'] = hour
      i++
    }
    return statusData
  }

  reportData(data){
    let report = []
    data.forEach((value, key)=>{
      let reportData = {
        _id: value._id,
        status: value.status,
        report_date: value.report_date,
        data: this.statusData(value.data)
      }
      report.push(reportData)
      // console.log(value.data)
    })
    // console.log(report)
    // console.log(data)
    this.draftReport = report
  }

}
