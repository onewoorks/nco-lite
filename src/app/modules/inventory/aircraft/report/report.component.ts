import { Component, OnInit,Input } from '@angular/core';
import { SubmissionService } from 'src/app/service/api/dailyreport/submission.service'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() inventory_id: string;
  dailyFields: any;
  constructor(private apiSubmissionReport: SubmissionService) { }

  ngOnInit() {
  }

  updateReport(id){
    // this.
  }

  

}
