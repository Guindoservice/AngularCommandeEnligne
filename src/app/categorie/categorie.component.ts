import { NgFor, NgIf } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategorieService } from '../Services/categorie.service';
import { AjoutModifeProduitComponent } from '../categorie/ajout-modife-categorie/ajout-modife-categorie.component';
import {CategorieInterface} from "./CategorieInterface";
import {SouscatInterface} from "./SouscatInterface";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {AjoutSousCategorieComponent} from "./sous-categorie/ajoutSousCategorie/ajoutsouscategorie.component";
import {SousCategorieComponent} from "./sous-categorie/sous-categorie.component";

interface Categorie {
  id: number;
  nom: string;
  souscategorie: string;
  Action: null;
}

declare var $: any;

@Component({
  selector: 'app-categorie',
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
    NgFor,
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
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    MatTooltip,
    MatButtonModule
  ],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css',
})
export class CategorieComponent implements OnInit {

  constructor(private categorieService: CategorieService,
              private dialog: MatDialog,
              private essai:MatDialog
  ) {
  }

  catagories!: CategorieInterface[];
  SonId!:number

  ngOnInit() {


    this.categorieService.getAllCategories().subscribe(data => {
      this.catagories = data;
    });


  }

  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
      height: '50%',
      panelClass: 'custom-dialog-container',
      data: {},
    })
  }

  openEditDialog(categoryId: number): void {
    this.dialog.open(SousCategorieComponent, {
      data: {category_id: categoryId}
    });
  }

  deleteCategory(id: number): void {
    this.categorieService.deleteCategory(id).subscribe({
      next: () =>
        console.log(`supprimer avec succès ${id}`),
      error: (err) => console.error('Erreur', err)

    })
    window.location.reload()

  }

  openDialoNg(): void {
    const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
      height: '50%',
      panelClass: 'custom-dialog-container',
      data: {},
    })
  }




  /****************************************/

}



