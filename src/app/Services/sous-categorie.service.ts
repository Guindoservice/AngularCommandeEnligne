import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../categorie/categorie.component'; // Adjust the import path accordingly
import { Scategorie } from '../categorie/sousCategorie/sous-categorie.component';

@Injectable({
  providedIn: 'root',
})
export class SousCategorieService {
  private creerUrl = 'http://localhost:8080/admin//creer-sous-categorie';
  private getSousCategorieUrl = 'http://localhost:8080/admin/sous-categories';

  constructor(private http: HttpClient) {}

  // Fetch all categories
  getSoucategorie(): Observable<Categorie[]> {
    return this.http.get<Scategorie[]>(this.getSousCategorieUrl);
  }

  // Fetch a specific category by ID
  getSouscategorie(id: number): Observable<Scategorie> {
    return this.http.get<Scategorie>(`${this.getSousCategorieUrl}/${id}`);
  }

  // Update a category by ID
  updateSouscategorie(
    id: number,
    souscategorie: Scategorie
  ): Observable<Scategorie> {
    return this.http.put<Scategorie>(`${this.creerUrl}/${id}`, souscategorie);
  }

  // Delete a category by ID
  deleteSouscategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.creerUrl}/${id}`);
  }

  // Create a new category
  createSouscategorie(scategorie: Scategorie): Observable<Scategorie> {
    return this.http.post<Scategorie>(this.creerUrl, scategorie);
  }
}
