import { Injectable } from '@angular/core';
import { BooksList } from './books-list.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BooksListService {

  constructor(private http:HttpClient) { }

  formData: BooksList = new BooksList();
  readonly baseUrl = 'https://localhost:44326'

  // getBook(){
  //   this.http.get(this.baseUrl, this.formData);
  // }
}
