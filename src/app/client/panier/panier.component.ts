import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { ClientServiceService, Panier } from '../../Services/client.service.service';
import { error } from 'highcharts';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [MatIconModule, MatPaginator],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent  implements OnInit{
 

 listePanier : Panier[]=[];
  constructor(private panierservice: ClientServiceService){}
  ngOnInit(): void {
    this.getPanier();
  }

  getPanier(){
    this.panierservice.getPanier().subscribe((data)=>{
      this.listePanier= data;
    },
  (error =>{
    console.log("Erreur d'affichage de la liste des panier",error)
  })
  );
  }
  
}
