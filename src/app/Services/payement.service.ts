import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementService {

  private baseUrl = 'http://localhost:8080/admin';
  private payementUrl = `${this.baseUrl}/voirPayement`;

  constructor(private http: HttpClient) { }
  // Méthode pour obtenir toutes les catégories
  
  getpayement(): Observable<any> {
    
    return this.http.get<any[]>(this.payementUrl);
  }
}
