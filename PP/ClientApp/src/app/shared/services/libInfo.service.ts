import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LibInfo } from "../models/libInfo.model";

@Injectable()
export class LibInfoService {

  constructor(private http: HttpClient) { }

  formData: LibInfo = new LibInfo();
  readonly baseUrl = 'https://localhost:44326/api/LibInfo';

  getInfo(): Observable<any> {
    return this.http.get<LibInfo>(this.baseUrl);
  }
}