import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import * as moment from 'jalali-moment';
import { CommonService } from '../services/common.service';

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
    @Input() requestId: string;
    @Output() close =  new EventEmitter<void>();
    showDesc: boolean = true;
    skip = 0;
    pageSize = 10;
    public buttonCount = 10;
    public info = true;
    public pageSizes = true;
    public previousNext = true;
    private items = new Array();
    gridData: GridDataResult;
 
    private loadItems(): void {
      this.gridData = process(this.items, this.state);
        // this.datasource = {
        //     data: this.items.slice(this.skip, this.skip + this.pageSize),
        //     total: this.items.length
        // };sdsd
    }

    public onChange(state: State): void {
      this.state = state;
      this.loadItems();
    }

    getResultDescItems() {
        this.commonService.getAgentResultDesc(this.commonService.requestId).subscribe(success => {
          this.items = success;
          this.items.forEach(item => {
            item.OccurrenceDateTime = moment(item.OccurrenceDateTime).locale('fa').format('YYYY/M/D HH:mm:ss');
          });
          // this.datasource.data = process(this.items, this.state);
        // this.datasource.data = this.items;
          this.loadItems();
        });
    }

    onClose() {
        this.close.emit();
    }
}