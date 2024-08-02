import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { SousCategorieService } from '../Services/sous-categorie.service';
import { AjoutModifeCategorieComponent } from '../categorie/ajout-modife-categorie/ajout-modife-categorie.component';
import { Router, RouterLink } from '@angular/router';
import { SousCategorieComponent } from './sousCategorie/sous-categorie.component';


export interface Categorie { 
  id: number;
  libelle: string;
}

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [
    RouterLink,
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
  ],
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  categories: Categorie[] = [];
  selectedSousCategorie: any;
  displayedColumns: string[] = ['id', 'nom', 'sousCategorie', 'action'];
  dataSource: Categorie[] = [];
  isLoadingResults = true;

  constructor(
    private dialog: MatDialog,
    private categorieService: CategorieService,
    private sousCategorieService: SousCategorieService
  ) { }
  
  
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
      this.dataSource = data; // Ensure dataSource is updated
      this.isLoadingResults = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.categories.filter((categorie) =>
      categorie.libelle.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutModifeCategorieComponent, {
      height: '50%',
      panelClass: 'custom-dialog-container',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Add new category to the list immediately
        this.categories.push(result);
        this.dataSource = [...this.categories]; // Update dataSource
      }
    });
  }

  modifiercategorie(id: number): void {
    this.categorieService.getCategorie(id).subscribe((categorie) => {
      const dialogRef = this.dialog.open(AjoutModifeCategorieComponent, {
        height: '50%',
        panelClass: 'custom-dialog-container',
        data: { categorie: categorie },
      });

      dialogRef.afterClosed().subscribe((updatedCategorie) => {
        if (updatedCategorie) {
          // Update the category in the list
          const index = this.categories.findIndex(
            (c) => c.id === updatedCategorie.id
          );
          if (index !== -1) {
            this.categories[index] = updatedCategorie;
            this.dataSource = [...this.categories]; // Update dataSource
          }
        }
      });
    });
  }

  supprimercategorie(id: number): void {
    if (confirm('Voulez-vous supprimer cette catégorie')) {
      this.categorieService.deleteCategorie(id).subscribe(() => {
        // Remove the category from the list immediately
        this.categories = this.categories.filter((c) => c.id !== id);
        this.dataSource = [...this.categories]; // Update dataSource
      });
    }
  }
}