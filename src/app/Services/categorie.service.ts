import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategorieComponent } from '../categorie/categorie.component';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private baseUrl = 'http://localhost:8080/admin';
  public Urlcat = 'http://localhost:8080/admin/list-categories';
  private UrlCreerCat = 'http://localhost:8080/admin/creer-categorie';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.Urlcat);
  }

  // createCategory(category: any): Observable<any> {
  //   return this.http.post<any>(this.UrlCreerCat, category);
  // }
  createCategory(categoryData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/creer-categorie`, categoryData);
  }

  modifierCat(id: number, categoryData: FormData): Observable<any> {
    const url = `${this.baseUrl}/modifier-categorie/${id}`;
    return this.http.put(url, categoryData);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimer-categorie/${id}`);
  }

  getCategorieById(id: any): Observable<any> {
    return this.http.get(`http://localhost:8080/admin/categoriesBySous/${id}`);
  }

  // modifierCat(id: number, category: any): Observable<any> {
  //   const url = `http://localhost:8080/admin/modifier-categorie/${id}`;
  //   return this.http.put(url, category);
  // }
}
