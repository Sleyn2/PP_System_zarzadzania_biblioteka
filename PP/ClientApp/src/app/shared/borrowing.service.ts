import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Borrowing } from './borrowing.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  constructor(private http: HttpClient) { }

  addBorrowing(borrowing: Borrowing)
  {
    const borrowingUrl = 'https://localhost:44326/api/Borrowing';
    return this.http.post<Borrowing>(borrowingUrl, borrowing);
  }
}
