import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private configService: ConfigService) { }

  public diagnosticsResult: any = [];
  public selectedRowRequestId: any;

  public getAgentResults() {
    return this.configService.get('diag/results');
  }

  public getAgentResultDesc(id: string) {
    return this.configService.get("diag/results/" + id);
  }
}
