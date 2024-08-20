import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private baseUrl = 'http://localhost:8080/admin';
  private produitUrl = `${this.baseUrl}/listes-des-produits`;
  public createUrl = `${this.baseUrl}/creer-produit`;
  private updateUrl = `${this.baseUrl}/modifierProduit`;
  private categorieUrl = `${this.baseUrl}/list-categories`;
  private souscategorieUrl = `${this.baseUrl}/list-sous-categorie`;

  private username = 'samake';
  private password = 'samake';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const credentials = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    });
  }

  getProduit(): Observable<any> {
    return this.http.get<any>(`${this.produitUrl}`, {
      headers: this.getAuthHeaders(),
    });
  }
 

  ajouterProduit(formData: any): Observable<any> {
    return this.http.post<any>(this.createUrl, formData);
  }

  modifierProduit(id: number, produit: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    formData.append('file', produit.image.url);
    formData.append('description', produit.description);
    formData.append('prix', produit.prix.toString());
    formData.append('quantite', produit.quantite.toString());
    formData.append('libelle', produit.libelle);
    formData.append('sousCategory', produit.sousCategory.toString());

    return this.http.put<HttpResponse<any>>(
      `${this.baseUrl}/modifier-produit/${id}`,
      formData,
      {
        headers: headers,
        reportProgress: true,
        observe: 'response',
      }
    );
  }

  supprimerProduit(id: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/supprimer-produit/${id}`, {
      headers,
    });
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.categorieUrl);
  }

  getSousCategories(): Observable<any> {
    return this.http.get<any>(`${this.souscategorieUrl}`);
  }
  getproduitImages(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/fileInfo`);
  }

  listFiles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listFiles`);
  }
}import { DomSanitizer } from '@angular/platform-browser';

