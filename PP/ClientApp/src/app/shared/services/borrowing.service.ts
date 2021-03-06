import { Injectable } from '@angular/core';
import { Borrowing } from '../models/borrowing.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  checkOut(id: number) {
    return this.http.put(this._borrowingUrl + '/checkout/' + id, this.httpOptions);
  }
  checkIn(id: number) {
    return this.http.put(this._borrowingUrl + '/checkin/' + id, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(this._borrowingUrl + '/' + id);
  }

  listAll(): Observable<any> {
    return this.http.get(this._borrowingUrl + '/all');
  }

  listAllPrivate(id: string): Observable<any> {
    if(id === undefined) id = 'x'
    return this.http.get(this._borrowingUrl + '/allPrivate/' + id);
  }

  listOngoing(): Observable<any> {
    return this.http.get(this._borrowingUrl + '/ongoing');
  }

  listReserved(): Observable<any> {
    return this.http.get(this._borrowingUrl + '/reserved');
  }
}
