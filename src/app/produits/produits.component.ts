import { AjoutModifeProduitComponent } from './ajout-modife-produit/ajout-modife-produit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProduitService } from '../Services/produit.service';
import { NgFor, NgIf } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

interface Produit {
  id: number;
  images: string[];
  libelle: string;
  quantite: number;
  prix: number;
  date: string;
  description: string;
  utilisateur: utilisateur;
  sousCategory: souscategories;
}



interface utilisateur {
  id: number;
  username: string;
  
}


interface souscategories {
  id: number;
  libelle: string;
  category: { id: number; libelle: string };
}

interface category {
  id: number;
  libelle: string;
}

interface ProduitA {
  description: string;
  prix: number;
  quantite: number;
  libelle: string;
  sousCategory: { id: number };
}

interface ProduitM {
  id: number;
  image: string;
  description: string;
  prix: number;
  quantite: number;
  libelle: string;
  sousCategory: number;
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
    NgIf,
    // import
  ],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit, AfterViewInit {
  // filtre les produits
  products: Produit[] = [];
  dataSource = new MatTableDataSource<Produit>();
  filterelement($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    const filterValue = inputElement.value.toLowerCase();

    if (filterValue) {
      this.products = this.products.filter((product) =>
        product.libelle.toLowerCase().includes(filterValue)
      );
    } else {
      this.loadAllProducts();
    }
  }

  // charger les products
  loadAllProducts() {
    this.produitservice.getProduit().subscribe((data) => {
      this.products = data;
    });
  }

  // visibilite IU
  isContainerVisible = false;
  isEditContainerVisible = false;
  isDeleteContainerVisible = false;
  isDeleteConfirmationVisible = false;

  // colonne pour le tableau
  displayedColumns: string[] = [
    'id',
    'fileInfo',
    'libelle',
    'quantite',
    'prix',
    'date',
    'description',
    'utilisateur',
    'sousCategory',
    'Action',
  ];

  // Structure des données du produit
  produit: ProduitA = {
    libelle: '',
    quantite: 0,
    prix: 0,
    description: '',
    sousCategory: { id: 0 },
  };
  produitModifier: ProduitM = {
    id: 0,
    image: '',
    description: '',
    prix: 0,
    quantite: 0,
    libelle: '',
    sousCategory: 0,
  };
  produitsup: ProduitM = {
    id: 0,
    description: '',
    prix: 0,
    quantite: 0,
    libelle: '',
    sousCategory: 0,
    image: '',
  };

  // Categories and subcategories
  fileInfo: File[] = [];
  sousCategories: souscategories[] = [];
  filteredSousCategories: souscategories[] = [];
  categories: category[] = [];
  searchText: string = '';

  constructor(
    private dialog: MatDialog,
    private produitservice: ProduitService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    (window as any).angularComponent = this;
  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.loadProduits();
    this.loadCategories();
  }

  loadProduits(): void {
    this.produitservice.getProduit().subscribe((data) => {
      this.products = data;
      console.log('datasource loaded:', this.dataSource.data);
    });
  }

  loadCategories(): void {
    this.produitservice.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  filterSousCategories(categoryId: number): void {
    this.filteredSousCategories = this.sousCategories.filter(
      (sousCategory) => sousCategory.category.id === categoryId
    );
  }

  modifierProduit(id: number): void {
    this.produitservice.modifierProduit(id, this.produitModifier).subscribe(
      (response) => {
        this.loadProduits();
        this.hideEditContainer();
        this.snackBar.open('Modification réussie', 'Fermer', {
          duration: 3000,
        });
        this.resetProduit();
      },
      (error) => {
        this.snackBar.open('Échec de la modification', 'Fermer', {
          duration: 3000,
        });
        console.error('Erreur lors de la modification du produit', error);
      }
    );
  }

  supprimerProduit(id: number): void {
    this.produitservice.supprimerProduit(id).subscribe(
      (response) => {
        this.loadProduits();
        this.hideDeleteContainer();
        this.snackBar.open('Suppression réussie', 'Fermer', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Échec de la suppression', 'Fermer', {
          duration: 3000,
        });
        console.error('Erreur lors de la suppression du produit', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
      width: '500px',
      data: {
        //
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProduits();
      }
    });
  }

  // ouvrir pour la mdoification du dialog
  openEditDialog(produit: Produit): void {
    const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
      height: '650px',
      panelClass: 'custom-dialog-container',
      data: produit,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result === true) {
        this.loadProduits();
      }
    });
  }

  showContainer() {
    this.resetProduit();
    this.isContainerVisible = true;
  }

  showEditContainer(produit: ProduitA) {
    this.produit = { ...produit };
    this.isEditContainerVisible = true;
  }

  showDeleteContainer(produit: ProduitA) {
    this.produit = { ...produit };
    this.isDeleteContainerVisible = true;
  }

  hideContainer() {
    this.isContainerVisible = false;
  }

  hideEditContainer() {
    this.isEditContainerVisible = false;
  }

  hideDeleteContainer() {
    this.isDeleteContainerVisible = false;
  }

  //initialiser le formulaire
  resetProduit() {
    this.produit = {
      libelle: '',
      quantite: 0,
      prix: 0,
      description: '',
      sousCategory: { id: 0 },
    };
  }
}
