import { Injectable } from '@angular/core';
import { Borrowing } from '../models/borrowing.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  constructor(private http: HttpClient) { }

  private readonly _borrowingUrl = 'https://localhost:44326/api/Borrowing';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addBorrowing(bookId: number) {
    return this.http.post<Borrowing>(this._borrowingUrl + '/' + bookId, this.httpOptions);
  }

  canBorrow(bookId: number) {
    return this.http.get<Borrowing>(this._borrowingUrl + '/canBorrow/' + bookId, this.httpOptions);
  }

  listAll(){
    return this.http.get(this._borrowingUrl + '/all');
  }

  listOngoing(){
    return this.http.get(this._borrowingUrl + '/ongoing');
  }

  listReserved(){
    return this.http.get(this._borrowingUrl + '/reserved');
  }
}
