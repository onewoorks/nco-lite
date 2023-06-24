import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() listItems = []
  inventory_id: string;
  constructor() { }

  ngOnInit() {
  }


  addReport(id: string){
    window.location.href = `reports/inventory/draft/${id}`
  }

  itemReport(id: string){
    window.location.href = `reports/inventory/aircraft/${id}`
  }

}
