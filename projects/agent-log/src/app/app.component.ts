import { Component } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CommonService } from './services/common.service';
import * as moment from 'jalali-moment';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { process, State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor (private commonService: CommonService, private sanitizer: DomSanitizer) {
    this.getResultItems();
  }

  public state: State = {
    skip: 0,
    take: 5
  };
  
  showDesc: boolean = false;
  gridData: GridDataResult;
  pageSize = 10;
  private items = new Array();
  requestId: string;

  // private loadItems(): void {
  //   this.datasource = {
  //       data: this.items.slice(this.skip, this.skip + this.pageSize),
  //       total: this.items.length
  //   };
  // }

  private loadItems(): void {
    this.gridData = process(this.items, this.state);
  }

  public onChange(state: State): void {
    this.state = state;
    this.loadItems();
  }

  onHandleClose() {
    this.showDesc = false;
  }

  onShowDesc({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    if(columnIndex === 3) {
      // this.descComponent.requestId = this.datasource.data[rowIndex].RequestId;
      this.showDesc = true;
      this.commonService.requestId = this.gridData.data[rowIndex].RequestId;
      // this.requestId = this.datasource.data[rowIndex].RequestId;
    }
  }

  getResultItems() {
    this.commonService.getAgentResults().subscribe(success => {
      this.items = success;
      // this.datasource.data = this.items;
      this.items.forEach(row => {
        row.Description = "...";
        if (row.Status === 0) {
          row.Status = "عادی";
        }
        else if (row.Status === 1){
          row.Status = "بحرانی";
        }
        else if (row.Status === 2) {
          row.Status = "دارای هشدار";
        }

        row.LatestUpdateOn = moment(row.LatestUpdateOn).locale('fa').format('YYYY/M/D HH:mm:ss');
      });
      this.loadItems();
    });
  }

  public colorCode(status: string): SafeStyle {
    let result;

    switch (status) {
     case 'عادی' :
       result = '#b3ff66';
       break;
     case 'بحرانی' :
       result = '#ff6347';
       break;
      case 'دارای هشدار' :
        result = '#ffcc00';
        break;
    }

    return this.sanitizer.bypassSecurityTrustStyle(result);
  }
}
