import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor (commonService: CommonService) {
    // commonService.getAgentResults();
    // this.loadGrid();
  }

  // public columns: any[] = [{field: "َAccount"}, {field: "Date"}, {field: "ُStatus"}, {field: "More"}];
  // public bindingType: String = 'array';
  // public view: Observable<GridDataResult>;

  // public gridData: any = products;
  // public gridDataResult: GridDataResult = {data: products, total: products.length};

  title = 'agent-log';
  showDesc: boolean = false;
  skip = 0;
  kendoSource: any = [
    {
      accountName: "تجارت گستر نوین",
      lastUpdate: new Date(),
      status: "حاد",
      description: "..."
    }
  ];
  pageSize = 10;
  private items = new Array();

  private loadItems(): void {
    this.kendoSource = {
        data: this.items.slice(this.skip, this.skip + this.pageSize),
        total: this.items.length
    };
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  loadGrid() {
    this.kendoSource.gridData = this.items;
    this.loadItems();
  }

  onHandleClose() {
    this.showDesc = false;
  }

  onShowDesc({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    this.showDesc = true;
  }
}
