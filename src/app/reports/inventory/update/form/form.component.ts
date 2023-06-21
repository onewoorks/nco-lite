import { Component, OnInit } from '@angular/core';
import { RefsService } from 'src/app/service/api/refs.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  selectLine: any = []
  selectAcState: any = []
  selectStatusSurveillance: any = []
  selectMissionCapable: any = []

  constructor(
    private apiRefsService: RefsService
  ) { }

  ngOnInit() {
    this.getSelectLine()
    this.getSelectAcState()
    this.getSelectStatusSurveillance()
    this.getSelectMissionCapable()
  }

  getSelectLine(){
    this.apiRefsService.getList('aircraft','line').subscribe((data)=>{
      this.selectLine = data
    })
  }

  getSelectAcState(){
    this.apiRefsService.getList('aircraft','ac_state').subscribe((data)=>{
      this.selectAcState = data
    })
  }

  getSelectStatusSurveillance(){
    this.apiRefsService.getList('aircraft','status_surveillance').subscribe((data)=>{
      this.selectStatusSurveillance = data
    })
  }

  getSelectMissionCapable(){
    this.apiRefsService.getList('aircraft','mission_capable').subscribe((data)=>{
      this.selectMissionCapable = data
    })
  }

}
