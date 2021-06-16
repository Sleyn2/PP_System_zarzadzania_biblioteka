import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BookDetail} from './book-detail.model'
@Injectable({
  providedIn: 'root'
})
export class BookDetailService {

  constructor(private http:HttpClient) { }
  
  cardData: BookDetail = new BookDetail();
  readonly baseURL = 'https://localhost:44326'
  

}
