import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = 'https://localhost:44326/api/Book'
  list: Book[];

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllBooks() {
    this.http.get(this.baseUrl)
      .toPromise()
      .then(res => this.list = res as Book[]);
  }

  getBooks(tittle: string) {
    if (tittle === '') {
      this.getAllBooks()
    } else {
      this.http.get(this.baseUrl + '/t/' + tittle)
        .toPromise()
        .then(res => this.list = res as Book[]);
    }
  }

  getBook(id: number) {
    const idUrl = this.baseUrl + '/' + id;
    return this.http.get<Book>(idUrl);
  }

  updateBook(book: Book): Observable<any> {
    const bookUrl = this.baseUrl + '/' + book.id;
    return this.http.put(bookUrl, book, this.httpOptions);
  }

  addBook(book: Book): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }
}
