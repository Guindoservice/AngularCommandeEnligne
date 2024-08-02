import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;

  constructor(private http: HttpClient){
    this.baseUrl = 'http://localhost:8080/admin/liste_utilisateurs'
  }

  public findAll(token: string):Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl, {
      headers: new HttpHeaders(
        
      {
        'content-Type': 'application/json',
        'Authorization': token,

      }
    )

    })
      
    

  }

}
