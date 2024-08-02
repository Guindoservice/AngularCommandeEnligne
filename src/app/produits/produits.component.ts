import { NgIf } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AjoutModifeProduitComponent } from './ajout-modife-produit/ajout-modife-produit.component';
import { ProduitService } from '../Services/produit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



declare var $: any; 

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
    MatSortModule,FormsModule,CommonModule
  ],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css',
})
export class ProduitsComponent implements OnInit, AfterViewInit {
  isContainerVisible = false;
  isEditContainerVisible= false;
  isDeleteContainerVisible = false;
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


  dataSource = new MatTableDataSource<Produit>();
  sousCategories: souscategories[] = [];
  filteredSousCategories: souscategories[] = [];
  categories: category[] = [];
  searchText: string = '';

  constructor(private dialog: MatDialog,
    private produitservice: ProduitService
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadCategories();
    this.loadSousCategories();  
   }

   loadProduits(): void {
    this.produitservice.getProduit().subscribe(data => {
      this.dataSource.data= data;
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

  modifierProduit(id: number, produitm: ProduitM): void {
    this.produitservice.modifierProduit(id, produitm).subscribe(response => {
      // Optionnel : Vous pouvez ajouter une notification ou un message de succès ici
      this.loadProduits();
      this.hideEditContainer();
    }, error => {
      // Gérer les erreurs ici
      console.error('Erreur lors de la modification du produit', error);
    });
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


  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit() {
  
  }

  showInfo(_t82: any) {
    throw new Error('Method not implemented.');
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