import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDetail } from './book-detail.model'
@Injectable({
  providedIn: 'root'
})
export class BookDetailService {

  constructor(private http: HttpClient) { }

  getBook(id: number) {
    const idUrl = 'https://localhost:44326/api/Book/' + id;
    return this.http.get<BookDetail>(idUrl);
  }

}



