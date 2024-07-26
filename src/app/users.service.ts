import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;

  constructor(private http: HttpClient){
    this.baseUrl = 'http://localhost:8080'
  }

  public findAll():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl, {
      headers: new HttpHeaders(
        
      {
        'content-Type': 'application/json',
        'Authorization': 'Basic' + btoa('admin:admin'),

      }
    )

    })
      

  }

}
