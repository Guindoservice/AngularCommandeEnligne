import { Injectable } from '@angular/core';
import {} from '../categorie/categorie.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private apiUrl = 'http://localhost:8080/api/categorie';
  constructor(private http: HttpClient) {}

  getcategorie(id: number): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  modifiercategorie(id: number): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, {});
  }

  supprimercategorie(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  creercategorie(id: number): Observable<any> {
    return this.http.post(this.apiUrl, {});
  }
}
