import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RefsService } from 'src/app/service/api/refs.service'
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() draftId: string
  @Input() draftTime: string
  @Input() draftTimeData: Object
  @Input() reportData: any
  @Output() updateReportData = new EventEmitter<any>();
  selectLine: any = []
  selectAcState: any = []
  selectStatusSurveillance: any = []
  selectMissionCapable: any = []
  inventoryFormat: any[]
  selectedValueData: any
  timeDataStatusForm: FormGroup



  constructor(
    private apiRefsService: RefsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getSelectLine()
    this.getSelectAcState()
    this.getSelectStatusSurveillance()
    this.getSelectMissionCapable()

    this.timeDataStatusForm = this.formBuilder.group({
      line: [null],
      ac_state: [null],
      mission_capable: [null],
      status_surveillance: [null],
      minutes: 0
    })
  }

  ngOnChanges(changes){
    this.setDataToArray(changes.draftTimeData)
  }

  setFormValues(data){
    this.timeDataStatusForm = this.formBuilder.group({
      line: data.line,
      ac_state: data.ac_state,
      status_surveillance: data.status_surveillance,
      mission_capable: data.mission_capable,
      minutes: data.minutes,
    })
  }

  setDataToArray(data){
    let statusItems = data.currentValue
    let statusData  = []
    if(typeof statusItems !== 'undefined'){
      this.setFormValues(statusItems)
      for (const key in statusItems) {
        if (statusItems.hasOwnProperty(key)) {
          statusData.push({
            status: key.toString().replace("_"," "),
            value: statusItems[key]
          })
        }
      }
      this.inventoryFormat = statusData
      this.selectedValueData = statusItems
    }
    
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

  timeStatusData(statusName, value){
    let statusData          = this.selectedValueData
    statusData[statusName]  = value
    this.updateReportData.emit()
  }
}