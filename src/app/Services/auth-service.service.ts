import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

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
      { username, password },
      httpOptions
    ).pipe(
      map((response: any) => {
        // Process the response if necessary
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg: string;
        if (error.status === 401) {
          errorMsg = 'Utilisateur ou mot de passe incorrect.';
        } else {
          errorMsg = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }
    
   

  
  logout(): Observable<any> {
    this.token = '';
    return this.http.post(this.baseUrl + 'signout', { }, httpOptions);
  }
}
