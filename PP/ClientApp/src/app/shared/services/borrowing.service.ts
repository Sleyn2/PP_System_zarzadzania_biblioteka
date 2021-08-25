import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Borrowing } from '../models/borrowing.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  constructor(private http: HttpClient) { }

  httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addBorrowing(bookId: number)
  {
    const borrowingUrl = 'https://localhost:44326/api/Borrowing';
    return this.http.post<Borrowing>(borrowingUrl + '/' + bookId, this.httpOptions);
  }
}
