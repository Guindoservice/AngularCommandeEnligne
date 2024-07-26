import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private baseUrl = `${environment.apiUrl}/produits`; // Assuming environment variable for API URL

  constructor(private http: HttpClient) {}

  createProduit(produit: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, produit);
  }

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }

  updateProduit(id: number, produit: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, produit);
  }

  deleteProduit(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
}
