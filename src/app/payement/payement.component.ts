import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { PayementService } from '../Services/payement.service';
import { MatDialog } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var $: any; 
interface payement {
  id: number;
  date: string;
  total: string;
  
}
@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [
    MatIcon,
    MatPaginator,
    NgFor,
     FormsModule,
    NgIf
  ],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.css'
})

export class PayementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'date', 'total'];
filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  payement: any;

  constructor(
    private dialog: MatDialog,
    private payementService: PayementService
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
    this.payementService.getpayement().subscribe((data) => {
      //
      this.payement =data.map((payement: any, index: number)=> ({
        ...payement,
        id: index + 1,
      }));
      console.log(data);
      this.payement = data;
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
      data: this.payement,
      columns: [
        { data: 'id' }, // Column 0: Numéro
       
        {data: 'date'}, // Column 2: Description
      
        { data: 'total' }, // Column 5: Categorie
       
        
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

