import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MinicoreService {
  URL: string = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private readonly http: HttpClient) {}

  getAllClients() {
    return this.http.get(`${this.URL}/clients`, this.httpOptions).pipe(
      tap((clients) => {
        return clients;
      })
    );
  }

  getAllContracts() {
    return this.http.get(`${this.URL}/contracts`, this.httpOptions).pipe(
      tap((contracts) => {
        return contracts;
      })
    );
  }

  getReports(dates: any) {
    return this.http.post(`${this.URL}/contracts/minicore`, dates);
  }
}
