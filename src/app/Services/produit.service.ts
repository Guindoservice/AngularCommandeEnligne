import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private listProduit = 'http://localhost:8080/admin/listesProduit';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.listProduit);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.listProduit}/${id}`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.listProduit}/${id}`);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.listProduit}/${id}`, product);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.listProduit, product);
  }
}


