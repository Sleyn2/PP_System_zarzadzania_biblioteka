import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BookDetail} from './book-detail.model'
@Injectable({
  providedIn: 'root'
})
export class BookDetailService {

  constructor(private http:HttpClient) { }
  
  cardData: BookDetail = new BookDetail();
  readonly baseURL = 'https://localhost:44326'

  
  getBook(id: number): Observable<BookDetail>{
    const url = '${this.baseURL}/${id}';
    return this.http.get<BookDetail>(url)

  }
  

}
