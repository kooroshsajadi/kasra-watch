import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
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
    private items = new Array();
    datasource: any = [];
 
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

    fillResultGrid() {
        this.commonService.getAgentResults().subscribe(success => {
          this.items = success;
          this.datasource.data = this.items;
          this.loadItems();
        });
    }

    onClose() {
        this.close.emit();
    }
}