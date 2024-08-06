import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SouscatInterface} from "../categorie/SouscatInterface";

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {


  private UrlCreat="http://localhost:8080/admin/sous-categorie";
  private UrlList="http://localhost:8080/admin/sous-categorie"

  constructor(private http:HttpClient) { }

  createCategory(souscat:SouscatInterface): Observable<any>{
    return this.http.post<SouscatInterface>(this.UrlCreat, souscat)
  };

  createSousCategory(formData : FormData, id:any): Observable<any>{
    return this.http.post<SouscatInterface>(`http://localhost:8080/admin/souscategoriesAjout/${id}`, formData)
  };

  getSousCategorie():Observable<SouscatInterface[]>{
    return this.http.get<SouscatInterface[]>(this.UrlList)
  }

  DelSousCat(id:number): Observable<void>{
    return this.http.delete<void>(`http://localhost:8080/admin/sous-categorie/${id}`)
  }






  /*createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.UrlCreerCat, category);
  }*/

}
