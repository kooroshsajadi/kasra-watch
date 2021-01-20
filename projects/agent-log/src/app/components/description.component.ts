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
    private items = new Array();
    gridData: GridDataResult;
 
    private loadItems(): void {
      this.gridData = process(this.items, this.state);
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
          this.loadItems();
        });
    }

    onClose() {
        this.close.emit();
    }
}