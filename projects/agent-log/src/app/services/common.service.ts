import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  public getAgentResults() {
    return this.http.get('http://localhost:5001/api/diag/results').subscribe(
      results => {
        console.log(results)
      });
  }
}
