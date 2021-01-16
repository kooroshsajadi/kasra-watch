import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  serverAddress = "http://localhost:5001/api"
 
  constructor(public http: HttpClient) { }

  public post(url, body, mode?): Observable<any> {
    let httpOptions
    if (mode == "zip") {
      httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        responseType: 'blob'
      }
    }
    else {
      httpOptions = {
       
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
         
      }
    }
    return this.http.post(this.serverAddress + '/' + url, JSON.stringify(body), httpOptions);
  }

  public get(url: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({'Access-Control-Allow-Origin': 'http://localhost:4200'}),
      responseType: 'blob'
    } 
   
    return this.http.get(this.serverAddress + '/' + url);
  }
}