import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Stock, StockServiceService } from '../Services/stock.service.service';
declare var $: any; // Déclaration pour utiliser jQuery dans Angular
@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent implements AfterViewInit, OnInit {
 
  ListStock: Stock[]=[];

  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  stcok: any;
  editStock(arg0: any) {
    throw new Error('Method not implemented.');
  }
  deleteStock(arg0: any) {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit() {}

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
      deleteSt(id:number):void{
        this.stockservice.deleteSt(id).subscribe(response=>{
          console.log('Produit supprimé', response);
        }, error => {
          console.error('Erreur lors de la suppression du produit dans stock', error);
      });
        
      
      } 
}
