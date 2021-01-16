import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
   selector:  'app-description',
   templateUrl: './description.component.html',
   styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
    @Input() dataSource: any = [];
    @Output() close =  new EventEmitter<void>();
    showDesc: boolean = true;
    skip = 0;
    pageSize = 10;
    private items = new Array();
 
    private loadItems(): void {
        this.dataSource = {
            data: this.items.slice(this.skip, this.skip + this.pageSize),
            total: this.items.length
        };
    }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadItems();
    }

    loadGrid() {
        this.dataSource.gridData = this.items;
        this.loadItems();
    }

    onClose() {
        this.close.emit();
    }
}