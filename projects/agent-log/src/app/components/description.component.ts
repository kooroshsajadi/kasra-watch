import { Component, Output, EventEmitter } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { CommonService } from '../services/common.service';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { ResultDescription } from '../shared/models/result-description.model';

@Component({
   selector:  'app-description',
   templateUrl: './description.component.html',
   styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
    
    constructor (private commonService: CommonService) {
        this.getResultDescItems();
      }

    public state: State = {
      skip: 0,
      take: 5
    };
    @Output() close =  new EventEmitter<void>();
    showDesc: boolean = true;
    private items: ResultDescription[];
    gridData: GridDataResult;
 
    private loadItems(): void {
      this.gridData = process(this.items, this.state);
    }

    public onChange(state: State): void {
      this.state = state;
      this.loadItems();
    }

    public rowCallback = (context: RowClassArgs) => {
      switch (context.dataItem.ProblemLevelName) {
        case "Information":
          return {green : true};
        case "Error":
          return {gold : true};
        case "Warning":
          return {yellow: true};
       }
     }

    getResultDescItems() {
        this.commonService.getAgentResultDesc(this.commonService.selectedRowRequestId).subscribe(success => {
          this.items = success;
          this.orderItems()
          this.loadItems();
        });
    }

    orderItems() {
      var temp = new Array<ResultDescription>()
      this.items.forEach(item => {
        if (item.ProblemLevelName.toLowerCase() === "error") {
          temp.push(item);
        }
      });
      this.items.forEach(item => {
        if (item.ProblemLevelName.toLowerCase() === "warning") {
          temp.push(item);
        }
      });
      this.items.forEach(item => {
        if (item.ProblemLevelName.toLowerCase() === "information") {
          temp.push(item);
        }
      });
      this.items.length = 0
      temp.forEach(data => {
        this.items.push(data);
      });
    }

    onClose() {
        this.close.emit();
    }
}