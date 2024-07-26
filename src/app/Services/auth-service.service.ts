import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl: string = 'http://localhost:8080/auth/login';
  public token: string = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    this.token = `Basic `+btoa(username+':'+password);
    return this.http.post(
      this.baseUrl,
      {
        username,
        password,
      },
      httpOptions
    );
  }
}

