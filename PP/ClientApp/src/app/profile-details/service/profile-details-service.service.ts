import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileDetailsServiceService {

  readonly baseUrl = 'https://localhost:44326/api'

  constructor(private http: HttpClient) { }

  updateUser(body :any) {
    return this.http.put(this.baseUrl + '/ApplicationUser/Update', body);
  }

}
