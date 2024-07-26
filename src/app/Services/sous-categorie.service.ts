import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Adjust the import if needed

@Injectable({
  providedIn: 'root',
})
export class SousCategorieService {
  private baseUrl = `${environment.apiUrl}/scategorie`; // Assuming environment variable for API URL

  constructor(private http: HttpClient) {}

  createSousCategorie(
    categorieId: number,
    sousCategorie: any
  ): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/create/${categorieId}`,
      sousCategorie
    );
  }

  getSousCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }

  updateSousCategorie(id: number, sousCategorie: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, sousCategorie);
  }

  deleteSousCategorie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
}
