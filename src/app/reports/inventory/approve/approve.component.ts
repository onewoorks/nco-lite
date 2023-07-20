import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSubmissionReportService } from 'src/app/service/api/submission_report/submission-report.service'
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ReportInventoryApproveComponent {
  inventoryDetail: any
  dailyFields: Object
  draftId: string

  constructor(
    private route: ActivatedRoute,
    private apiSubmissionReportService: ApiSubmissionReportService,
    private apiService: ApiService
    ) { }

    ngOnInit() {
      this.draftId = this.route.snapshot.paramMap.get('id')
      this.getDraftReport()
    }

    getDraftReport(){
      this.apiSubmissionReportService.getDraftReport(this.draftId).subscribe((data) =>{
        this.dailyFields = data
        this.getInventoryDetail()
      }) 
    }

    getInventoryDetail(){
      this.apiService.getAircraftById(this.dailyFields['inventory_id']).subscribe((data)=> {
        this.inventoryDetail = data
      })
    }

    goback(){
      window.location.href = `reports/inventory/draft/${this.dailyFields['inventory_id']}`
    }

    submitReport(reportStatus){
      let report        = this.dailyFields
      report['status']  = reportStatus
      this.apiSubmissionReportService.updateReport(report)
      window.location.href = `/reports/inventory/draft/${report['inventory_id']}`
    }
}
