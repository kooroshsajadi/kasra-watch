import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private configService: ConfigService) { }

  public getResults(): Observable<any> {
    return this.configService.get('diag/results');
  }
  
}
