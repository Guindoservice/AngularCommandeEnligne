import { Injectable } from '@angular/core';
import {CategorieComponent} from '../categorie/categorie.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {CategorieInterface} from "../categorie/CategorieInterface";
import {SouscatInterface} from "../categorie/SouscatInterface";

@Injectable({
  providedIn: 'root',
})
export class CategorieService {



  public Urlcat ="http://localhost:8080/admin/categories"

  private UrlCreerCat="http://localhost:8080/admin/categories"

  private UrldelCat="http://localhost:8080/admin/categories/{{id}}?"
  private CatById="http://localhost:8080/admin/categories/{{id}}?"




  constructor(private http:HttpClient) { }


  getAllCategories():Observable<CategorieInterface[]>{
    return this.http.get<CategorieInterface[]>(this.Urlcat)
  }

/*  createCategory(categorie1:CategorieInterface):Observable<CategorieInterface>{
    return this.http.post<CategorieInterface>(this.UrlCreerCat, categorie1)
  }*/

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.UrlCreerCat, category);
  }


  deleteCategory(id:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8080/admin/categories/${id}` )
  }


  getCategorieById(id : any):Observable<any>{
    return this.http.get(`http://localhost:8080/admin/categoriesBySous/${id}`)
  }

  modifierCat(id:number, categoriemod:any): Observable<any>{
    return this.http.put(`http://localhost:8080/admin/categories/${id}`, categoriemod)
  }


  /*voirPayement():Observable<Payment[]>{
    return this.http.get<Payment[]>(this.apiUrl);
  }

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
  }*/
}
