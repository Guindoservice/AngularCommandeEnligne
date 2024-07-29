import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Livraison {
  id?: number;
  numeroCommande: string;
  date: string;
  nomClient: string;
  contactClient: string;
  totalCommande: string;
  option: string;
}


@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  private apiUrl = 'http://localhost:8080/api/livraisons';

  constructor(private http: HttpClient) {}

  getLivraisons(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(this.apiUrl);
  }
  createLivraison(livraison: Livraison): Observable<Livraison> {
    return this.http.post<Livraison>(this.apiUrl, livraison);
  }
}
