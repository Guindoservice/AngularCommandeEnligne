import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProduitService {
  private baseUrl = 'http://localhost:8080/admin';
  private produitUrl = `${this.baseUrl}/listesProduit`;
  public createUrl = `${this.baseUrl}/Creerproduit`;
  private updateUrl = `${this.baseUrl}/modifierProduit`; 
  private deleteUrl = `${this.baseUrl}/supprimerProduit`;
  private categorieUrl= `${this.baseUrl}/categories`;
  private souscategorieUrl= `${this.baseUrl}/sous-categorie`; 

  private username = 'samake'; 
  private password = 'samake'; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const credentials = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    });
  }

  getProduit(): Observable<any> {
    
    return this.http.get<any[]>(this.produitUrl);
  }

  ajouterProduit(produit: any): Observable<HttpResponse<any>> {
    const headers = this.getAuthHeaders();
    return this.http.post<HttpResponse<any>>(this.createUrl, produit, { headers, responseType: 'text' as 'json'});
  }

  modifierProduit(id: number, produit: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.updateUrl}/${id}`, produit, { headers, responseType: 'text' as 'json'});
  }

  supprimerProduit(id: number): Observable<any> {
    
    return this.http.delete<any>(`${this.deleteUrl}/${id}`);
  }
  getCategories(): Observable<any> {
    return this.http.get<any>(this.categorieUrl);
  }
  getSousCategories(): Observable<any> {
    
    return this.http.get<any>(`${this.souscategorieUrl}`);
  }
}


