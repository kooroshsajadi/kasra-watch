import { Component } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor (commonService: CommonService) {
    commonService.getAgentResults()
  }

  public columns: any[] = [{field: "َAccount"}, {field: "Date"}, {field: "ُStatus"}, {field: "More"}];
  public bindingType: String = 'array';
  public view: Observable<GridDataResult>;

  // public gridData: any = products;
  // public gridDataResult: GridDataResult = {data: products, total: products.length};

  title = 'agent-log';
}
