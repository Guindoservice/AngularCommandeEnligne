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
import { AjoutModifeCategorieComponent } from '../categorie/ajout-modife-categorie/ajout-modife-categorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Categorie {
  id: number;
  imagePath: string;
  libelle: string;
  souscategorie: string[];
  Action: '';
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
    MatButtonModule,
  ],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css',
})
export class CategorieComponent implements OnInit {
  constructor(
    private categorieService: CategorieService,
    private dialog: MatDialog,
    private essai: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  catagories!: Categorie[];
  // SonId!: number;

  ngOnInit() {
    this.categorieService.getAllCategories().subscribe((data) => {
      this.catagories = data as unknown as Categorie[];
    });
  }

  filterelement($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    const filterValue = inputElement.value.toLowerCase();
    this.catagories = this.catagories.filter((category) =>
      category.libelle.toLowerCase().includes(filterValue)
    );
  }

  ngAfterViewInit(): void {
    const filterInputElement = document.querySelector(
      '#filterInput'
    ) as HTMLInputElement;
    if (filterInputElement) {
      filterInputElement.addEventListener(
        'input',
        this.filterelement.bind(this)
      );
    }
  }

  applyFilter($event: KeyboardEvent) {
    const inputElement = $event.target as HTMLInputElement;
    const filterValue = inputElement.value.toLowerCase();
    this.catagories = this.catagories.filter((category) =>
      category.libelle.toLowerCase().includes(filterValue)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutModifeCategorieComponent, {
      height: '50%',
      panelClass: 'custom-dialog-container',
      data: {},
    });
  }
  editCategory(id: number) {
    this.categorieService.getCategorieById(id).subscribe({
      next: (category) => {
        const dialogRef = this.dialog.open(AjoutModifeCategorieComponent, {
          width: '400px',
          data: {
            libelle: category.libelle,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.categorieService.modifierCat(id,category).subscribe({
              next: () => {
                this.snackBar.open('Categorie modifier', 'Fermer', {
                  duration: 3000,
                  horizontalPosition: 'center',
                });
                this.reloadData();
              },
              error: (err) => {
                this.snackBar.open('Échec de la modification', 'Fermer', {
                  duration: 3000,
                });
              },
            });
          }
        });
      },
      error: (err) =>
        console.error('Échec de récupération de la catégorie', err),
    });
  }

  deleteCategory(id: number): void {
    this.categorieService.deleteCategory(id).subscribe({
      next: () => {
        this.snackBar.open('Categorie supprimée', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'center',
        });
        this.reloadData();
      },
    });
  }

  openDialoNg(): void {
    const dialogRef = this.dialog.open(AjoutModifeCategorieComponent, {
      height: '50%',
      panelClass: 'custom-dialog-container',
      data: {},
    });
  }

  reloadData(): void {
    this.ngOnInit();
  }
  /****************************************/
}
