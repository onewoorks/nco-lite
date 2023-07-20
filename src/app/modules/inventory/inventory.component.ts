import { Component } from '@angular/core';
import { InventoryService } from 'src/app/service/api/inventory/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class ModulesInventoryComponent {
  list_of_inventories: any = [];

  constructor(
    private inventoryService: InventoryService
    ){}

  ngOnInit() {
    // this.getAllInventories()
  }

  getAllInventories() {
    this.inventoryService
      .getInventories()
      .subscribe((data)=>{
        this.list_of_inventories = data
      })
  }
}
