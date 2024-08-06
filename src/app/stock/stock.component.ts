import {  Component, OnInit } from '@angular/core';
import { Stock, StockServiceService } from '../Services/stock-service.service';


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {

ListStock: Stock[]=[];
constructor(private stockservice: StockServiceService){}

  ngOnInit(): void {
    this.getListStock();
  }

getListStock(){
  this.stockservice.getListStock().subscribe(
    (data)=>{
      this.ListStock= data;
    },
    (error)=>{
      console.log("Erreur lors d'affichage du produit dans stock",error)
    });
    }
    deleteStock(id: number){
      this.stockservice.deleteStock(id).subscribe(
        ()=>{
          console.log(`Stocke avec Id ${id} supprimer avec succès `);
          this.getListStock();
        },
        (error)=>{  
          console.log(`Erreur de supprission ${id}`,error)
        }
      )      }
}
