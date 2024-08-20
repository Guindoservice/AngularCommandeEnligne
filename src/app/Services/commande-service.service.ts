import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {
  private baseUrl = 'http://localhost:8080/admin';
  private commandeUrl = `${this.baseUrl}/voirCommandes`;
  private commandeUrlN = `${this.baseUrl}/nombresCommande`;

  constructor(private http: HttpClient) { }
  // Méthode pour obtenir toutes les catégories
  
  getCommande(): Observable<any> {
    
    return this.http.get<any[]>(this.commandeUrl);
  }

  public getNombreCommandes(token: string): Observable<any> {
    const authToken = `Basic ${token}`;
    return this.http.get<any>(this.commandeUrlN, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authToken
      })
    }).pipe(
      catchError(error => {
        console.log(error);
        
        return throwError(() => new Error("Erreur de recup"));
      })
    );
  }

}
