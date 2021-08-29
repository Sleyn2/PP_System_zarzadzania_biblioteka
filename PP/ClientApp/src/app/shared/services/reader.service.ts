import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Reader } from '../models/reader.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http:HttpClient) { }

  formData: Reader = new Reader();
  readonly baseUrl = 'https://localhost:44326/api/ApplicationUser'
  list: Reader[];

  getAllReaders()
  {
    this.http.get(this.baseUrl)
    .toPromise()
    .then(res => this.list = res as Reader[]);
  }

  getReaders(name:string)
  {
    if(name==='')
    {
      this.getAllReaders()
    } 
    else
    {
    this.http.get(this.baseUrl+ '/s/' + name)
    .toPromise()
    .then(res => this.list = res as Reader[]);
    }
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
