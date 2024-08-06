import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ProduitsComponent } from '../produits/produits.component';
export interface Produitliste {
  id: number
  libelle: string
  description: string
  prix: number
  quantite: null
  sousCategorie: {
    id: number
    libelle: string
  }
}
export interface SousCategorie{
  id : string,
  lebelle: string
}
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private apiUrl = 'http://localhost:8080/api/products'; // Change to your API endpoint
  private apiUrl = 'http://localhost:3000/products';
  private apiCat = 'http://localhost:8080/admin/sous-categorie';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // obtenir le sous Catégorie
  getsousCate(): Observable<SousCategorie[]> {
  return this.http.get<SousCategorie[]>(this.apiCat);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
}
function signal<T>(arg0: never[]) {
  throw new Error('Function not implemented.');
}

