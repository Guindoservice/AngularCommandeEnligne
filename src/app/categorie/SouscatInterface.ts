import {CategorieInterface} from "./CategorieInterface";


export interface SouscatInterface{

  Id?:number;
  libelle:string;
  category_id: {
    id:number;
  };
}
