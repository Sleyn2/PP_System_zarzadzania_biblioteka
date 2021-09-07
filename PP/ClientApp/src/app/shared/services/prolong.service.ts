import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProlongService {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    readonly baseUrl = 'https://localhost:44326/api/ProlongationRequest'

    createProlongRequest(borrowingId: number) {
        return this.http.post(this.baseUrl + '/' + borrowingId, this.httpOptions);
    }
}
