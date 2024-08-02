import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProduitService {
  private baseUrl = 'http://localhost:8080/admin';
  private produitUrl = `${this.baseUrl}/listesProduit`;
  private createUrl = `${this.baseUrl}/Creerproduit`;
  private updateUrl = `${this.baseUrl}/modifierProduit`; 
  private deleteUrl = `${this.baseUrl}/supprimerProduit`;
  private categorieUrl= `${this.baseUrl}/categories`;
  private souscategorieUrl= `${this.baseUrl}/sous-categorie`; 

  

  constructor(private http: HttpClient) { }

  getProduit(): Observable<any> {
    
    return this.http.get<any[]>(this.produitUrl);
  }

  ajouterProduit(produit: any): Observable<any> {
   
    return this.http.post<any>(this.createUrl, produit);
  }

  modifierProduit(id: number, produit: any): Observable<any> {
    
    return this.http.put<any>(`${this.updateUrl}/${id}`, produit);
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


