import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { CommandeServiceService } from '../Services/commande-service.service';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface commande {
  id: number;
  date: string;
  nom: string;
  contact: string;
  total: string;
  statut: string;
}

declare var angularComponent: any;
declare var $: any;  // Déclaration pour utiliser jQuery dans Angular

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css'],
  standalone: true,  // Important pour Angular 13 et supérieur
  imports: [
    MatIconModule,
    MatPaginator,
    NgFor,
     FormsModule,
    NgIf
  ],
})
export class CommandesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'date', 'nom', 'contact', 'total', 'statut'];
filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  commande: any;

  constructor(
    private dialog: MatDialog,
    private commandeService: CommandeServiceService
  ) {
    (window as any).angularComponent = this;
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  ngOnInit() {
    this.fetchCommande();
  }

  fetchCommande() {
    this.commandeService.getCommande().subscribe((data) => {
      //
      this.commande =data.map((commande: any, index: number)=> ({
        ...commande,
        id: index + 1,
      }));
      console.log(data);
      this.commande = data;
      this.initializeDataTable();
    });
  }
 


// filterelement($event: Event) {
// throw new Error('Method not implemented.');
// }
//   commandes: any[] = [];

//   constructor(private commandeService: CommandeServiceService) { }

//   ngOnInit(): void {
//     this.loadCommandes();
//   }

//   loadCommandes(): void {
//     this.commandeService.getCommande().subscribe(
//       (data: any[]) => {
//         this.commandes = data;
//       },
//       (error) => {
//         console.error('There was an error!', error);
//       }
//     );
//   }

  

initializeDataTable() {
  $(document).ready(() => {
    if ($.fn.DataTable.isDataTable('#example')) {
      $('#example').DataTable().clear().destroy();
    }
    $('#example').DataTable({
      language: {
        processing: 'Traitement en cours...',
        search: 'Rechercher&nbsp;:',
        lengthMenu: 'Afficher _MENU_ &eacute;l&eacute;ments',
        info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty:
          "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered:
          '(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)',
        loadingRecords: 'Chargement en cours...',
        zeroRecords: 'Aucun &eacute;l&eacute;ment &agrave; afficher',
        emptyTable: 'Aucune donnée disponible dans le tableau',
        paginate: {
          first: '<<',
          previous: 'Prev',
          next: 'Suiv',
          last: '>>',
        },
      },
      data: this.commande,
      columns: [
        { data: 'id' }, // Column 0: Numéro
       
        {data: 'date'}, // Column 2: Description
        { data: 'nom' }, // Column 1: Nom de Produit
        { data: 'prix' }, // Column 3: Prix
        { data: ' contact' }, // Column 4: Quantite
        { data: 'total' }, // Column 5: Categorie
        { data: 'statut' }, // Column 6: SousCategorie
        
      ],
      columnDefs: [
        {
          targets: 6,
          data: null,
        },
      ]
    });
  
  });
}


}

