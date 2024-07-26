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
import { ProduitService } from '../Services/produits.service';

declare var $: any;

interface Product {
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
  products: Product[] = [];
  filteredProducts = new MatTableDataSource<Product>(this.products);
  

  constructor(private dialog: MatDialog, private produitService:ProduitService) {}

  

  loadProduits(): void {
    this.produitService.getProduits().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts.data = this.products;
    });
  }

  ngOnInit(): void {
    this.applyFilter();
    this.loadProduits();
  }

  applyFilter(): void {
    this.filteredProducts.data = this.products.filter((product) =>
      product.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  openDialog(product: Product | null = null): void {
    const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
      width: '800px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      data: product ? { ...product } : {},
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        if (product) {
          // Update existing product
          const index = this.products.findIndex((p) => p.numero === product.numero);
          this.products[index] = result;
          this.updateProduit(result);
          this.produitService
            .updateProduit(product.numero, result)
            .subscribe(() => {
              this.loadProduits();
            });
        } else {
          // Add new product
          result.numero = this.products.length + 1;
          this.products.push(result);
          this.createProduit(result);
          this.produitService.createProduit(result).subscribe(() => {
            this.loadProduits();
          });
        }
        this.applyFilter();
      }
    });
  }

  createProduit(product: Product): void{
    this.produitService.createProduit(product).subscribe(
      (data) => {
        console.log('Produit crée avec succès', data);
      },
      (error) => {
        console.log('Erruer de creation....', error);
      }
    );
  }

  updateProduit(prooduit: Product): void{
    this.produitService.updateProduit(prooduit.numero, prooduit).subscribe(
      (data) => {
        console.log('Produit mdofier avec succès', data);
      },
      (error) => {
        console.log('Erreur de modification...', error);
      }
    );
}


  deleteProduct(product: Product): void {
    this.produitService.deleteProduit(product.numero).subscribe(
      (data) => {
        this.products = this.products.filter((p) => p.numero !== product.numero);
        this.applyFilter();
      },
      (error) => {
        console.log('Erreur de suppression...', error);
      }
    );
    
    this.loadProduits();
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
