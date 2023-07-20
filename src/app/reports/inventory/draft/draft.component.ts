import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSubmissionReportService } from 'src/app/service/api/submission_report/submission-report.service'
import { ApiService } from 'src/app/service/api.service';
import { SumPipe } from 'src/app/helpers/pipe/sum.pipe';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})


export class ReportInventoryDraftComponent implements OnInit { 
  inventory_id: string;
  draftReport: any = [];
  inventoryDetail: any
  theDate = new Date();


//   transform(items: any, attr: string): any {
//     let totalhour = items.reduce((a, b) => a + b[attr], 0);
//     return 1;
// }

  constructor(
    private apiSubmissionReportService: ApiSubmissionReportService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.inventory_id = this.route.snapshot.paramMap.get('id')
    this.getInventoryDetail()
    
  }

  getInventoryDetail(){
    this.apiService.getAircraftById(this.inventory_id).subscribe((data)=> {
      this.inventoryDetail = data
      this.renderReportSubmission()
    })
  }

  renderReportSubmission(){
    this.apiSubmissionReportService.getDraftReportInventory(this.inventoryDetail).subscribe((data) => {
      this.reportData(data)
    })
  }

  updateReport(draft_id: string){
    window.location.href = `reports/inventory/update/${draft_id}`
  }

  approveReport(draft_id: string){
    window.location.href = `reports/inventory/approve/${draft_id}`
  }


  statusData(status){
    let lineCode      = {}
    status.forEach((value,key)=>{
      
      value.data.forEach((a,b)=>{
        
        if(typeof lineCode[a.line_code] === "undefined"){
          lineCode[a.line_code] = {
            ac_state: a.ac_state,
            status_surveillance: a.status_surveillance,
            mission_capable: a.mission_capable,
            line_code: a.line_code,
            timestamp: a.timestamp
          }
        }    
      })
    })
    
    let hourlyData    = []
    Object.keys(lineCode).forEach((i,v)=>{
      let hour = [];
      status.forEach((value,key)=>{
        let obj = value.data.find(o => o.line_code === i);
        hour.push({
          hour: value.time,
          minutes: (typeof obj !== "undefined") ? parseInt(obj.minutes) : 0
        })
      })
      hourlyData.push({
        line_code: i,
        line_code_detail: lineCode[i],
        hourly: hour
      })
    })
    return hourlyData
  }

  reportData(data){
    if(data !== null){
      let report = []
      data.forEach((value, key)=>{
        let reportData = {
          _id: value._id,
          status: value.status,
          report_date: value.report_date,
          data: this.statusData(value.data)
        }
        report.push(reportData)
      })
      this.draftReport = report
    } else {
      window.location.reload()
    }
    
  }
}
