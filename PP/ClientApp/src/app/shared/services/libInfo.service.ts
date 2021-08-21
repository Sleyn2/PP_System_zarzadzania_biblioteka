import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibInfo } from "../models/libInfo.model";

@Injectable()
export class LibInfoService {

  constructor(private http: HttpClient) { }
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  readonly baseUrl = 'https://localhost:44326/api/LibInfo';

  getInfo(): Observable<any> {
    return this.http.get<LibInfo>(this.baseUrl);
  }

  editInfo(newInfo: LibInfo): Observable<any>{
    return this.http.put(this.baseUrl, newInfo, this.httpOptions);
  }
}