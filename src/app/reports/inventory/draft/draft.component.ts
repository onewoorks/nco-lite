import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSubmissionReportService } from 'src/app/service/api/submission_report/submission-report.service'

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class ReportInventoryDraftComponent implements OnInit {
  inventory_id: string;
  draftReport: any = [];

  constructor(
    private apiSubmissionReportService: ApiSubmissionReportService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.inventory_id = this.route.snapshot.paramMap.get('id')
    this.renderReportSubmission()
  }

  renderReportSubmission(){
    this.apiSubmissionReportService.getDraftReportInventory(this.inventory_id).subscribe((data) => {
      this.draftReport = data
    })
  }

  updateReport(draft_id: string){
    window.location.href = `reports/inventory/update/${draft_id}`
  }

}
