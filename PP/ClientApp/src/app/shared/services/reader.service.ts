import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http:HttpClient) { }

  formData: User = new User();
  readonly baseUrl = 'https://localhost:44326/api/ApplicationUser'
  list: User[];

  getAllReaders()
  {
    this.http.get(this.baseUrl+ '/r/User')
    .toPromise()
    .then(res => this.list = res as User[]);
  }

  getReaders(name:string)
  {
    if(name==='')
    {
      this.getAllReaders()
    } 
    else
    {
    this.http.get(this.baseUrl+ '/r/User' + '/s/' + name)
    .toPromise()
    .then(res => this.list = res as User[]);
    }
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
