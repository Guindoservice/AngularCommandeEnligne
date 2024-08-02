import { AjoutModifeProduitComponent } from './ajout-modife-produit/ajout-modife-produit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProduitService } from '../Services/produit.service';
import { NgFor, NgIf } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

declare var $: any;
declare var angularComponent: any;

interface Produit {
  id: number,
  libelle: string,
  quantite: number,
  prix: number,
  date: string,
  description: string,
  utilisateur: utilisateur,
  sousCategory:  souscategories
}

interface utilisateur {
  id: number;
  email: string;
  mot_de_passe: string;
  id_role: role;
}
interface role{
  id: number,
  nom: string
}

interface souscategories{
  id:number,
  libelle:string,
  category:{"id":number, "libelle":string}
}
interface category {
  id: number;
  libelle: string;
}
interface ProduitA {
  description: string,
  prix: number,
  quantite: number,
  libelle: string,
  sousCategory: { id: number };
}
interface ProduitM{
  id:number
  description: string,
  prix: number,
  quantite: number,
  libelle: string,
  sousCategory:  number
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
    NgFor,NgIf
    // Import other Angular Material modules here
  ],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit, AfterViewInit {
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  products: Produit[] = [];
  isContainerVisible = false;
  isEditContainerVisible= false;
  isDeleteContainerVisible = false;
  isDeleteConfirmationVisible=false;
  displayedColumns: string[] = [
    'numero',
    'libelle',
    'quantite',
    'prix',
    'date',
    'description',
    'utilisateur',
    'sousCategory',
    'action'
  ]
  produit: ProduitA ={
    libelle: '',
    quantite: 0,
    prix: 0,
    description: '',
    sousCategory: { id: 0}
    }
  produitModifier: ProduitM={
  id:0,
  description: '',
  prix: 0,
  quantite: 0,
  libelle: '',
  sousCategory:  0
  }
  produitsup:ProduitM={
    id:0,
    description: '',
    prix: 0,
    quantite: 0,
    libelle: '',
    sousCategory:  0
  }

  dataSource = new MatTableDataSource<Produit>();
  sousCategories: souscategories[] = [];
  filteredSousCategories: souscategories[] = [];
  categories: category[] = [];
  searchText: string = '';

  constructor(
    private dialog: MatDialog,
    private produitservice: ProduitService
  ) {
    (window as any).angularComponent = this;
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit() {
    this.loadProduits();
    this.loadCategories();
    this.loadSousCategories();
  }

  loadProduits(): void {
    this.produitservice.getProduit().subscribe(data => {
      this.products= data;
      console.log('datasource loaded:', this.dataSource.data);
    });
  }
  loadCategories(): void {
    this.produitservice.getCategories().subscribe(data => {
      this.categories = data;
      
      console.log('Categories loaded:', this.categories);
    }, error => {
      console.error('Error loading categories:', error);
    });
  }
  loadSousCategories(): void {
    
    this.produitservice.getSousCategories().subscribe(data => {
      this.sousCategories = data;
      console.log('sousCategories loaded:', this.sousCategories);
    }, error => {
      console.error('Error loading categories:', error);
    });
  }
  filterSousCategories(categoryId: number): void {
    this.filteredSousCategories = this.sousCategories.filter(
      (sousCategory) => sousCategory.category.id === categoryId
    );
  }
 
  ajouterProduit(): void {
    const produitA: ProduitA = {
      libelle: this.produit.libelle,
      quantite: this.produit.quantite,
      prix: this.produit.prix,
      description: this.produit.description,
      sousCategory: { id: this.produit.sousCategory.id }
    };
    console.log(produitA);
    this.produitservice.ajouterProduit(produitA).subscribe(response => {
      this.loadProduits();
      this.hideContainer();
    }, error => {
      console.error('Erreur lors de l\'ajout du produit', error);
    });
  }

  modifierProduit(id: number): void {
    const produitM: ProduitM = {
      id: this.produitModifier.id,
      libelle: this.produitModifier.libelle,
      quantite: this.produitModifier.quantite,
      prix: this.produitModifier.prix,
      description: this.produitModifier.description,
      sousCategory: this.produitModifier.sousCategory
    };
    this.produitservice.modifierProduit(id, produitM).subscribe(response => {
      // Optionnel : Vous pouvez ajouter une notification ou un message de succès ici
      this.loadProduits();
      this.hideEditContainer();
    }, error => {
      // Gérer les erreurs ici
      console.error('Erreur lors de la modification du produit', error);
    });
  }
  showDeleteConfirmation(produit: Produit): void {
    this.produit = { ...produit };
    this.isDeleteConfirmationVisible = true;
  }

  confirmDelete(): void {
    this.produitservice.supprimerProduit(this.produitsup.id).subscribe(response => {
      this.loadProduits();
      this.isDeleteConfirmationVisible = false;
    }, error => {
      console.error('Erreur lors de la suppression du produit', error);
    });
  }

  cancelDelete(): void {
    this.isDeleteConfirmationVisible = false;
  }

  supprimerProduit(id: number): void {
    this.produitservice.supprimerProduit(id).subscribe(response => {
      // Optionnel : Vous pouvez ajouter une notification ou un message de succès ici
      this.loadProduits(); 
      this.hideDeleteContainer();
    }, error => {
      // Gérer les erreurs ici
      console.error('Erreur lors de la suppression du produit', error);
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
      if (result) {
        this.loadProduits(); // Recharger la liste des produits après la fermeture du dialogue
      }
    });
  }
  openEditDialog(produit:Produit): void {
   
    const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
      height: '650px',
      panelClass: 'custom-dialog-container',
      data: produit, // Passer les données du produit au composant de la boîte de dialogue
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.loadProduits(); // Recharger la liste des produits après la fermeture du dialogue
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
  resetProduit() {
    this.produit = {
      libelle: '',
      quantite: 0,
      prix: 0,
      description: '',
      sousCategory: { id: 0}
}
  }
}

