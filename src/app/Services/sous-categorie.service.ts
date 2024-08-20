import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SousCategorieComponent } from '../categorie/sous-categorie/sous-categorie.component';

@Injectable({
  providedIn: 'root',
})
export class SousCategorieService {
  private UrlCreat = 'http://localhost:8080/admin/creer-sous-categorie';
  private UrlList = 'http://localhost:8080/admin/list-sous-categorie';
  private UrlGetOne = 'http://localhost:8080/admin/categoriesBySous';
  private UrlUpdate = 'http://localhost:8080/admin/modifier-sous-categorie';
  private UrlDelete = 'http://localhost:8080/admin/supprimer-sous-categorie';

  constructor(private http: HttpClient) {}

  createSousCategory(
    sousCategory: any
  ): Observable<any> {
    return this.http.post<any>(this.UrlCreat, sousCategory);
  }

  getSousCategorie(): Observable<any[]> {
    return this.http.get<any[]>(this.UrlList);
  }

  getOneSousCat(id: number): Observable<any> {
    return this.http.get<any>(`${this.UrlGetOne}/${id}`);
  }

  UpdateSousCat(id: number, sousCat: any): Observable<any> {
    return this.http.put(`${this.UrlUpdate}/${id}`, sousCat);
  }

  DelSousCat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.UrlDelete}/${id}`);
  }
}
