// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  updateProduit(numero: any, product: any) {
    throw new Error('Method not implemented.');
  }
  createProduit(newProduct: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/products'; // Adjust URL based on your backend setup

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
