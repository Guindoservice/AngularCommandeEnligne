import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface  Stock{
id: number;
libelle: string;
quantite: number;
date: string;
utilisateur:
{  id: number;
username: string;
email: string;
motDePasse: string;
}
}
@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

private apiUrl = "http://localhost:8080/admin/listesProduit" ;
private apiUr = " http://localhost:8080/admin/supprimerProduit" ;

constructor(private http: HttpClient) { }
getListStock():Observable<Stock[]>{
    return this.http.get<Stock[]>(this.apiUrl);
  }

  deleteSt(id: number):Observable<any>{
   return this.http.delete(`${this.apiUr}${id}`);
  }
}
