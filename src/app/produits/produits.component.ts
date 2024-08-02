import { AjoutModifeProduitComponent } from './ajout-modife-produit/ajout-modife-produit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from '../Services/produit.service';
import { NgFor } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

declare var $: any;
declare var angularComponent: any;

interface Product {
  id: number;
  nom: string;
  prix: number;
  quantite: number;
  categorie: string;
  SousCategorie: string;
  Action: null;
}

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginator,
    NgFor,
    // Import other Angular Material modules here
  ],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit, AfterViewInit {
displayedColumns: any;
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  produits: any[] = [];

  constructor(
    private dialog: MatDialog,
    private productService: ProductService
  ) {
    (window as any).angularComponent = this;
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((data) => {
      //
      this.produits = data.map((product, index) => ({
        ...product,
        id: index + 1,
      }));
      console.log(data);
      this.produits = data;
      this.initializeDataTable();
    });
  }

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
        data: this.produits,
        columns: [
          { data: 'id' }, // Column 0: Numéro
          { data: 'nom' }, // Column 1: Nom de Produit
          {data: 'description'}, // Column 2: Description
          { data: 'prix' }, // Column 3: Prix
          { data: 'quantite' }, // Column 4: Quantite
          { data: 'category' }, // Column 5: Categorie
          { data: 'sousCategory' }, // Column 6: SousCategorie
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

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
      height: '650px',
      panelClass: 'custom-dialog-container',
      data: {
        //
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.fetchProducts();
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Voulez-vous supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.fetchProducts();
      });
    }
  }

  editProduct(id: number): void {
    this.productService.getProductById(id).subscribe((product) => {
      const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
        height: '650px',
        panelClass: 'custom-dialog-container',
        data: product,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.productService.updateProduct(id, result).subscribe(() => {
            this.fetchProducts();
          });
        }
      });
    });
  }

  viewProduct(id: number): void {
    this.productService.getProductById(id).subscribe((product) => {
      const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
        height: '650px',
        panelClass: 'custom-dialog-container',
        data: { product, viewOnly: true },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.fetchProducts();
        }
      });
    });
  }
}
