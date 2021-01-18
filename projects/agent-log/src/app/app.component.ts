import { Component } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { CommonService } from './services/common.service';
import * as moment from 'jalali-moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor (private commonService: CommonService) {
    this.fillResultGrid();
    // this.loadGrid();
  }

  title = 'agent-log';
  showDesc: boolean = false;
  skip = 0;
  datasource: any = [];
  pageSize = 10;
  private items = new Array();
  requestId: string;

  private loadItems(): void {
    this.datasource = {
        data: this.items.slice(this.skip, this.skip + this.pageSize),
        total: this.items.length
    };
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  // loadGrid() {
  //   this.commonService.getAgentResults()
  //   this.datasource.gridData = this.items;
  //   this.loadItems();
  // }

  onHandleClose() {
    this.showDesc = false;
  }

  onShowDesc({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    debugger
    if(columnIndex === 3) {
      this.requestId = this.datasource.data[rowIndex].RequestId;
      this.showDesc = true;
    }
  }

  fillResultGrid() {
    this.commonService.getAgentResults().subscribe(success => {
      this.items = success;
      // this.datasource.data = this.items;
      this.items.forEach(row => {
        row.Description = "...";
        if (row.Status === 0) {
          row.Status = "عادی";
        }
        else {
          row.Status = "حاد";
        }
        row.LatestUpdateOn = moment(row.LatestUpdateOn).locale('fa').format('YYYY/M/D');
      });
      this.loadItems();
    });
  }
}
