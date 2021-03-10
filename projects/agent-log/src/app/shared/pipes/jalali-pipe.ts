import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
    name: 'jalali'
  })
  export class JalaliPipe implements PipeTransform {
    transform(value: any, args?: any): any {
      let momentDate = moment(value, 'YYYY/MM/DD');
      let now = moment();
      now = moment(now, 'YYYY/MM/DD');
      let daysDifference = now.diff(momentDate, 'days');
      let hoursDifference = now.diff(momentDate, 'hours');
      let minutesDifference = now.diff(momentDate, 'minutes');
      if(daysDifference <= 20 && daysDifference >= 1) {
        // return momentDate.locale('fa').format('HH:mm:ss') + `روز قبل ${daysDifference}`
        return `${daysDifference} روز قبل ` + momentDate.locale('fa').format('HH:mm:ss')
      }
      else if(hoursDifference <= 23 && hoursDifference >= 1){
        return `${hoursDifference} ساعت قبل`
      }
      else if(minutesDifference <= 59 && minutesDifference >= 1){
        return `${minutesDifference} دقیقه قبل`
      }
      else if(minutesDifference < 1){
        return "چند لحطه پیش"
      }
      return momentDate.locale('fa').format('YYYY/M/D HH:mm:ss');
    }
  }