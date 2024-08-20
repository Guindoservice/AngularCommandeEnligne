import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { Client, ClientServiceService } from '../Services/client.service.service';
import { PanierComponent } from './panier/panier.component';
import { CommonModule } from '@angular/common';
import { error } from 'highcharts';
declare var $: any;
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [MatIconModule, MatPaginator, PanierComponent,CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements AfterViewInit  , OnInit{
  constructor(private clientservice:ClientServiceService ,){}
  ListeCient : Client[]=[];
  client: any;
  // pour ouvrir le sous composant 
OpenPanier: boolean = false;
OuvrirPanier(){
  this.OpenPanier=!this.OpenPanier;
}

  deleteClient(arg0: any) {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }



  ngOnInit(): void {
    this.getClient();
  }
 

  getClient(){
    this.clientservice.getClient().subscribe(
      (data)=>{
        this.ListeCient= data;
      },
      (error)=>{
        console.log("Erreur lors d'affichage du produit dans stock",error)
      });
    
}
  Suppriner(id: number){
    this.clientservice.deleteClient(id).subscribe((reponse)=>{
      console.log("Client supprimer"+id, reponse)
    },
    (error)=>{
      console.log("Erreure de suppression")
    }
  );
  }
}
