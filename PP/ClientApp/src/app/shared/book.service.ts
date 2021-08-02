import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http'
import { title } from 'process';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  formData: Book = new Book();
  readonly baseUrl = 'https://localhost:44326/api/Book'
  list: Book[];

  getAllBooks()
  {
    this.http.get(this.baseUrl)
    .toPromise()
    .then(res => this.list = res as Book[]);
  }

  getBooks(tittle:string)
  {
    if(tittle==='')
    {
      this.getAllBooks()
    } else
    {
    this.http.get(this.baseUrl+'/t/'+tittle)
    .toPromise()
    .then(res => this.list = res as Book[]);
    }
  }
}
