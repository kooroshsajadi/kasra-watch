import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CommonService } from './services/common.service';
import { JalaliPipe } from './shared/jalali-pipe';
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

  loadGrid() {
    this.commonService.getAgentResults()
    this.datasource.gridData = this.items;
    this.loadItems();
  }

  onHandleClose() {
    this.showDesc = false;
  }

  onShowDesc({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    if(columnIndex === 3) {
      this.showDesc = true;
    }
  }

  fillResultGrid() {
    this.commonService.getAgentResults().subscribe(success => {
      console.log(success)
      console.log(success.message)
      console.log(success.data)
      this.items = success;
      this.datasource.data = this.items;
      this.datasource.data.forEach(row => {
        row.Description = "...";
        if (row.Status === 0) {
          row.Status = "عادی";
        }
        else {
          row.Status = "حاد";
        }
        row.LatestUpdateOn = moment(row.LatestUpdateOn).locale('fa').format('YYYY/M/D');
      });
      console.log(this.datasource)
      this.loadItems();
    });
  }


}
