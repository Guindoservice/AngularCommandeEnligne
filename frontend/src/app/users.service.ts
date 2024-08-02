import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;

  constructor(private http: HttpClient){
    this.baseUrl = 'http://localhost:8080/admin'
  }


  public findAll(token: string):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/liste_utilisateurs`, {
      headers: new HttpHeaders(
        
        
      {
        'content-Type': 'application/json',
        'Authorization': token,

      }
    )

    })
      

  }

  public addUser(user: any, token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/creerpersonnel`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }).pipe(
      catchError(error => {
        console.error('Error adding user:', error);
        return throwError(() => new Error('Error adding user'));
      })
    );
  }

  public deleteUser(userId: number, token: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/supprimerUtilisateur/${userId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Error deleting user'));
      })
    );
  }

  public updateUser(userId: number, user: any, token: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifierUtilisateur/${userId}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Error updating user'));
      })
    );
  }
   // Obtenir les informations de l'utilisateur connecté
   public getCurrentUser(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/currentuser`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      catchError(error => {
        console.error('Error fetching current user:', error);
        return throwError(() => new Error('Error fetching current user'));
      })
    );
  }

  // Mettre à jour les informations de l'utilisateur connecté
  public updateCurrentUser(user: any, token: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updatecurrentuser`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      catchError(error => {
        console.error('Error updating current user:', error);
        return throwError(() => new Error('Error updating current user'));
      })
    );
  }
}
  

