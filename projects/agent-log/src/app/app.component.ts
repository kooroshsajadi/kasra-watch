import { Component } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { CommonService } from './services/common.service';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { process, State } from '@progress/kendo-data-query';
import { Result } from './shared/models/result.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{

  constructor (private commonService: CommonService, private sanitizer: DomSanitizer) {
    this.getResultItems();
  }

  public state: State = {
    skip: 0,
    take: 10
  };
  public accountNameList: Array<string> = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', '2X-Large'];
  showDesc: boolean = false;
  gridData: GridDataResult;
  private items: Result[];
  colMoreValue: string = "..."

  public rowCallback = (context: RowClassArgs) => {
    switch (context.dataItem.Status) {
      case 0:
        return {blue : true};
      case 1:
        return {red : true};
      case 2:
        return {yellow: true};
     }
   }

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
      this.showDesc = true;
      this.commonService.selectedRowRequestId = this.gridData.data[rowIndex].RequestId;
    }
  }

  getResultItems() {
    // this.items = this.commonService.getAgentResults()
    // this.loadItems();
    this.commonService.getAgentResults().subscribe(success => {
      this.items = success;
      this.loadItems();
    });
  }
  // getResultItems() {
  //   this.commonService.getAgentResults().subscribe(success => {
  //     this.items = success;
  //     this.items.forEach(row => {
  //       row.Description = "...";
  //       if (row.Status === 0) {
  //         row.Status = "عادی";
  //       }
  //       else if (row.Status === 1){
  //         row.Status = "بحرانی";
  //       }
  //       else if (row.Status === 2) {
  //         row.Status = "دارای هشدار";
  //       }

  //       row.LatestUpdateOn = moment(row.LatestUpdateOn).locale('fa').format('YYYY/M/D HH:mm:ss');
  //     });
  //     this.loadItems();
  //   });
  // }

  public colorCode(status: string): SafeStyle {
    let result: string;

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
