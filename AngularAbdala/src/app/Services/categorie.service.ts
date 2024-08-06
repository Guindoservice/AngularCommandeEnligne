import { Injectable } from '@angular/core';
import {} from '../categorie/categorie.component';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Categorie {
  id : number,
  libelle: string
}

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private apiurl= "http://localhost:8080/admin/categories";
  private apiurldel= " http://localhost:8080/admin/categoriesdelete";
  constructor(private http: HttpClient) {}

  getcategorie(): Observable<Categorie[]> {
    return this.http.get< Categorie[]>(this.apiurl);
  }

  modifiercategorie(id: number): Observable<any> {
    return this.http.put(this.apiurl + '/' + id, {});
  }

  supprimercategorie(id: number): Observable<any> {
    const token = 'authToken'; // Remplacez ceci par le mécanisme de récupération de votre token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiurldel}/${id}`, { headers });
  }
 
}
