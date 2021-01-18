import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  public diagnosticsResult: any = [];

  public getAgentResults() {
    return this.configService.get('diag/results');
    // return this.http.get('http://localhost:5001/api/diag/results').subscribe(
    //   results => {
    //     debugger
    //     this.diagnosticsResult = results
    //   });
  }

  public getAgentResultDesc(id: string) {
    return this.configService.get("diag/results/" + id);
  }
}
