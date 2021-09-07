import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  constructor(private http:HttpClient) { }

  formData: User = new User();
  readonly baseUrl = 'https://localhost:44326/api/ApplicationUser'
  list: User[];

  getAllLibrarians()
  {
    this.http.get(this.baseUrl+ '/r/Bibliotekarz')
    .toPromise()
    .then(res => this.list = res as User[]);
  }

  getLibrarians(name:string)
  {
    if(name==='')
    {
      this.getAllLibrarians()
    } 
    else
    {
    this.http.get(this.baseUrl+ '/r/Bibliotekarz'+ '/s/' + name)
    .toPromise()
    .then(res => this.list = res as User[]);
    }
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
