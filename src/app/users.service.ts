import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './utilisateurs/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:8080/admin'; // Ajustez selon votre configuration
  private username = 'samake'; // Nom d'utilisateur
  private password = 'samake'; // Mot de passe

  constructor(private http: HttpClient) {}

  private getAuthorizationHeader(): string {
    const credentials = btoa(`${this.username}:${this.password}`);
    return `Basic ${credentials}`;
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/liste_utilisateurs`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.getAuthorizationHeader(),
      }),
    });
  }

  public addAdmin(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/creeradmin`,
      user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getAuthorizationHeader(),
        }),
        observe: 'response',
        responseType: 'text' as 'json',
      }
    );
  }

  public addPersonnel(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}/Creerpersonnel`,
      user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getAuthorizationHeader(),
        }),
        observe: 'response',
        responseType: 'text' as 'json',
      }
    );
  }

  public deleteUser(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(
      `${this.baseUrl}/supprimerutilisateur/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getAuthorizationHeader(),
        }),
        observe: 'response',
        responseType: 'text' as 'json',
      }
    );
  }
}
