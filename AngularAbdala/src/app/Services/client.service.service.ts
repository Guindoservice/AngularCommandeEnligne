import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface  Client{
  id: number;
  nom: string;
  prenom : string
  status: string;
  adresse: string
  telephone: string;
 
  }
  export interface  Panier{
      id: number;
      libelle: string;
      prix: number;
      
    }
@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private apiUrl = " http://localhost:8080/admin/allClients" ;
  private apiUrldelet = "http://localhost:8080/admin/listes" ;
  private apiUrlpanier = "http://localhost:8080/admin/1/produits" ;

  constructor( private http: HttpClient) { }
  getClient():Observable<Client[]>{
    return this.http.get<Client[]>(this.apiUrl);
  }
  deleteClient(id: number):Observable<void>{
    const url=`${this.apiUrldelet}/${id}`;
    return this.http.delete<void>(url);

  }
  getPanier():Observable<Panier[]>{
    return this.http.get<Panier[]>(this.apiUrlpanier);
  }
  
}
