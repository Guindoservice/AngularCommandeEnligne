import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '';
  }

  public findAll(): Observable<any[]> {
    
    return this.http.get<any[]>(this.baseUrl, {
      
    });
  }
}
