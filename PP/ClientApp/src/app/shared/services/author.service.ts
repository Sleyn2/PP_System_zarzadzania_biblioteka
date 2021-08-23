import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Author } from "../models/author.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  private readonly _baseUrl = 'https://localhost:44326/api/Author'

  getAllAuthors(): Observable<any> {
    return this.http.get<Author>(this._baseUrl);
  }

  CheckIfAuthorExist(firstName: string, lastName: string): Observable<any> {
    return this.http.get<Boolean>(this._baseUrl + '/' + firstName + '/' + lastName);
  }
}