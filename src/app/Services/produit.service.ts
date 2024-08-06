import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProduitsComponent } from '../produits/produits.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private apiUrl = 'http://localhost:8080/api/products'; // Change to your API endpoint
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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
