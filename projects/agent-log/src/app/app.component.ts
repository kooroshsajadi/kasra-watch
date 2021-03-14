import { Component } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { CommonService } from './services/common.service';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { process, State } from '@progress/kendo-data-query';
import { Result } from './shared/models/result.model';
import { LiteralStatus } from './shared/pipes/literal-status.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{

  constructor (private commonService: CommonService, private sanitizer: DomSanitizer, private statusPipe: LiteralStatus) {
    this.getResultItems();
  }

  public state: State = {
    skip: 0,
    take: 10
  };

  
  public accountNameList: Array<string> = [];
  public statusSelectedValue = "";
  public accountNameSelectedValue = "";
  public statusList: Array<string> = ["", "دارای هشدار", "بحرانی", "عادی"];
  public accountNameListt: Array<string>;
  showDesc: boolean = false;
  gridData: GridDataResult;
  private allItems: Result[];
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

  private loadAccountNameList(): void {
    this.accountNameList.push("");
    for(var i = 0; i < this.allItems.length; ++i) {
      this.accountNameList.push(
        this.allItems[i].AccountName
      );
    }
  }

  private loadGridItems(): void {
    this.gridData = process(this.allItems, this.state);
  }

  public onChange(state: State): void {
    this.state = state;
    this.loadGridItems();
  }

  public clearFilters(): void {
    this.gridData = process(this.allItems, this.state);
  }

  public filterData(): void {
    var filteredItems: Result[] = [];
    if(this.accountNameSelectedValue != "") {
      this.allItems.forEach(element => {
        if(element.AccountName == this.accountNameSelectedValue) {
          if(this.statusSelectedValue != "") {
            this.allItems.forEach(element => {
              if(this.statusPipe.transform(element.Status) == this.statusSelectedValue) {
                filteredItems.push(element);
              }
            });
          }
          else{
            filteredItems.push(element);
          }
        }
      });
    }
    else {
      if(this.statusSelectedValue != "") {
        this.allItems.forEach(element => {
          if(this.statusPipe.transform(element.Status) == this.statusSelectedValue) {
            filteredItems.push(element);
          }
        });
      }
    }
    if(this.accountNameSelectedValue == "" && this.statusSelectedValue == "") {
      this.gridData = process(this.allItems, this.state);
    }
    this.gridData = process(filteredItems, this.state);
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
    this.commonService.getAgentResults().subscribe(success => {
      this.allItems = success;
      this.loadGridItems();
      this.loadAccountNameList();
    });
  }

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