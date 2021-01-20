import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../shared/models/result.model';
import { ConfigService } from './config.service';
import {map} from 'rxjs/operators';
import { ResultDescription } from '../shared/models/result-description.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private configService: ConfigService) { }

  public diagnosticsResult: any = [];
  public selectedRowRequestId: any;

  // public getAgentResults() {
  //   return this.configService.get('diag/results');
  // }

  public getAgentResults() : Observable<Result[]> {
    // var t = new Result();
    // t.AccountName = "کیمیاگان"
    // t.CustomerId = "sdfsdf-213213"
    // t.LatestUpdateOn = new Date()
    // t.Status = 2
    // t.RequestId = "sdfsf423-234-sdfs"
    // var arr = new Array();
    // arr.push(t);
    // arr.push(t);
    // arr.push(t);
    // arr.push(t);
    // arr.push(t);
    // arr.push(t);
    // arr.push(t);
    // arr.push(t);
    // arr.push(t);
    // arr.push(t);
    // arr.push(t);
    // return arr;
    return this.configService.get('diag/results').pipe(
      map(data => {
        return data.map(data => {
          return new Result().deserialize(data);
        });
      })
    );
  }

  public getAgentResultDesc(id: string) : Observable<ResultDescription[]> {
    return this.configService.get("diag/results/" + id).pipe(
      map(data => {
        return data.map(data => {
          return new Result().deserialize(data);
        });
      })
    );
  }
}
