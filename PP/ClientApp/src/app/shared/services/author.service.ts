import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Author } from "../models/author.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private readonly _baseUrl = 'https://localhost:44326/api/Author'

  getAllAuthors(): Observable<any> {
    return this.http.get<Author>(this._baseUrl);
  }

  checkIfAuthorExist(firstName: string, lastName: string): Observable<any> {
    return this.http.get<Boolean>(this._baseUrl + '/' + firstName + '/' + lastName);
  }

  addAuthor(author: Author): Observable<any> {
    return this.http.post(this._baseUrl, author);
  }

  getAuthor(id: number)
  {
    return this.http.get<Author>(this._baseUrl + '/' + id, this.httpOptions);
  }
}