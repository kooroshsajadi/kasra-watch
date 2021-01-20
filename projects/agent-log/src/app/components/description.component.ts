import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import * as moment from 'jalali-moment';
import { CommonService } from '../services/common.service';

@Component({
   selector:  'app-description',
   templateUrl: './description.component.html',
   styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
    
    constructor (private commonService: CommonService) {
        this.fillResultGrid();
      }

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
    datasource: any = [];
 
    private loadItems(): void {
        this.datasource = {
            data: this.items.slice(this.skip, this.skip + this.pageSize),
            total: this.items.length
        };
    }

    protected pageChange({ skip, take }: PageChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        this.loadItems();
    }

    fillResultGrid() {
        this.commonService.getAgentResultDesc(this.commonService.requestId).subscribe(success => {
          this.items = success;
          this.items.forEach(item => {
            item.OccurrenceDateTime = moment(item.OccurrenceDateTime).locale('fa').format('YYYY/M/D');
          });
        this.datasource.data = this.items;
          this.loadItems();
        });
    }

    onClose() {
        this.close.emit();
    }
}