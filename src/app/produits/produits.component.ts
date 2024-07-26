import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AjoutModifeProduitComponent } from './ajout-modife-produit/ajout-modife-produit.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

declare var $: any;

interface Produit {
  numero: number;
  nom: string;
  prix: string;
  categorie: string;
  sousCategorie: string;
}

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTableModule,
    MatDividerModule,
    NgIf,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatSortModule,
    FormsModule,
  ],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements AfterViewInit, OnInit {
  showInfo(_t82: any) {
    throw new Error('Method not implemented.');
  }

  searchText: string = '';
  displayedColumns: string[] = [
    'numero',
    'nom',
    'prix',
    'categorie',
    'sousCategorie',
    'action',
  ];
  produits: Produit[] = [
    {
      numero: 1,
      nom: 'Bakary Samaké',
      prix: '100000 F',
      categorie: 'Catégorie A',
      sousCategorie: 'Sous Catégorie A1',
    },
    {
      numero: 2,
      nom: 'Hamidou Diallo',
      prix: '100000 F',
      categorie: 'Catégorie B',
      sousCategorie: 'Sous Catégorie B1',
    },
  ];
  filteredProduits = new MatTableDataSource<Produit>(this.produits);
  categories = {
    'Catégorie A': ['Sous Catégorie A1', 'Sous Catégorie A2'],
    'Catégorie B': ['Sous Catégorie B1', 'Sous Catégorie B2'],
  };

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredProduits.data = this.produits.filter((produit) =>
      produit.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  openDialog(produit: Produit | null = null): void {
    const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
      width: '800px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      data: produit ? { ...produit } : {},
    });

    dialogRef.afterClosed().subscribe((result: Produit | undefined) => {
      if (result) {
        if (produit) {
          // Update existing product
          const index = this.produits.findIndex(
            (p) => p.numero === produit.numero
          );
          this.produits[index] = result;
        } else {
          // Add new product
          result.numero = this.produits.length + 1;
          this.produits.push(result);
        }
        this.applyFilter();
      }
    });
  }

  deleteProduit(product: Produit): void {
    this.produits = this.produits.filter((p) => p.numero !== product.numero);
    this.applyFilter();
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('#example').DataTable({
        language: {
          paginate: {
            first: '<<',
            previous: 'Last',
            next: 'Next',
            last: '>>',
          },
        },
      });
    });
  }
}
