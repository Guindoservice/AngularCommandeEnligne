import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametresService {

  
  private baseUrl: string;
  private baseUrl1: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/admin';
    this.baseUrl1 = 'http://localhost:8080/utilisateur';
  }
  

  
  public getCurrentUser(token: string): Observable<any> {
  
    const authHeader = `Basic ${token}`;  // Assurez-vous que le token est au format correct
    return this.http.get<any>(`${this.baseUrl1}/current`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authHeader
      })
    }).pipe(
      catchError(error => {
        console.error('Error fetching current user:', error);
        return throwError(() => new Error('Error fetching current user'));
      })
    );
  }

  public updateCurrentUser(user: any, token: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifierMotDePasse`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }).pipe(
      catchError(error => {
        console.error('Error updating current user:', error);
        return throwError(() => new Error('Error updating current user'));
      })
    );
  }
}