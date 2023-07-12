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

  transform(items: any, attr: string): any {
    let totalhour = items.reduce((a, b) => a + b[attr], 0);
    return 1;
}

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
    return statusData
  }

  statusData(status){
    let lineCode      = {}
    status.forEach((value,key)=>{
      value.data.forEach((a,b)=>{
        if(typeof lineCode[a.line_code] === "undefined"){
          lineCode[a.line_code] = {
            line: a.line,
            ac_state: a.ac_state,
            status_surveillance: a.status_surveillance,
            mission_capable: a.mission_capable
          }
        } 
        
      })
    })
    
    let hourlyData = []
    Object.keys(lineCode).forEach((i,v)=>{
      let hour = [];
      
      status.forEach((value,key)=>{
        let obj = value.data.find(o => o.line_code === i);
        hour.push({
          hour: value.time,
          minutes: (typeof obj !== "undefined") ? obj.minutes : 0
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
  }

}
