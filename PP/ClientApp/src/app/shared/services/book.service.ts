import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Book } from '../models/book.model';

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
}
