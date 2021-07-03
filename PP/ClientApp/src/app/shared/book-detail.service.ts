import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDetail } from './book-detail.model'
@Injectable({
  providedIn: 'root'
})
export class BookDetailService {

  constructor(private http: HttpClient) { }

  httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getBook(id: number) {
    const idUrl = 'https://localhost:44326/api/Book/' + id;
    return this.http.get<BookDetail>(idUrl);
  }

  updateBook(book: BookDetail): Observable<any>
  {
    const bookUrl = 'https://localhost:44326/api/Book/'+book.id;
    return this.http.put(bookUrl, book, this.httpOptions);
  }

}



