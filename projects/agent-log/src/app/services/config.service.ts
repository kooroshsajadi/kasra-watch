import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  serverAddress = "http://192.168.0.75:8095/api"
  // serverAddress = "http://localhost:5001/api"
 
  constructor(public http: HttpClient) { }

  public get(url: string): Observable<any> {
    // let httpOptions = {
    //   headers: new HttpHeaders({'Access-Control-Allow-Origin': 'http://localhost:5001'}),
    //   responseType: 'blob'
    // } 
   
    return this.http.get(this.serverAddress + '/' + url);
  }
}