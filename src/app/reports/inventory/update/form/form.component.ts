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
      minutes: 0,
      line_code: null
    })
  }

  ngOnChanges(changes){
    this.setDataToArray(changes.draftTimeData)
  }

  setFormValues(data){
    this.selectMissionCapable = this.findMCbyAcState('abbr', data.ac_state)
    this.timeDataStatusForm   = this.formBuilder.group({
      line:                 data.line,
      ac_state:             data.ac_state,
      status_surveillance:  data.status_surveillance,
      mission_capable:      data.mission_capable,
      minutes:              data.minutes,
      line_code:            data.line_code
    })
  }

  setDataToArray(data){
    let statusItems = data.currentValue
    let statusData  = []
    if(typeof statusItems !== 'undefined'){
      for (const key in statusItems) {
        if (statusItems.hasOwnProperty(key)) {
          statusData.push({
            // status: key.toString().replace("_"," "),
            status: key,
            value: statusItems[key]
          })
        }
      }
      this.inventoryFormat    = statusData
      this.selectedValueData  = statusItems
      this.setFormValues(statusItems)
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
    this.selectMissionCapable = []
  }

  timeStatusData(statusName, value){
    let statusData          = this.selectedValueData
    if(statusName === 'ac_state'){
      let result = this.findMCbyAcState('abbr', value);
      this.selectMissionCapable = result
      this.timeDataStatusForm = this.formBuilder.group({
        mission_capable:      result[0]['abbr'],
        ac_state:             value,
        status_surveillance:  statusData.status_surveillance,
        minutes:              statusData.minutes,
        line_code:            `${value}_${statusData.status_surveillance}_${result[0]['abbr']}`
      })
      statusData['mission_capable'] = result[0]['abbr']
    } 
    statusData[statusName]  = value    
    this.updateReportData.emit()
  }

  findMCbyAcState(key, value) {
    let mc_data = this.selectAcState.find((item) => item[key] === value);
    let mc_data_new = []
    mc_data.mission_capable.forEach((v,k)=>{
      mc_data_new.push({abbr: v})
    })
    return mc_data_new;
  }
}