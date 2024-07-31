import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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
  ],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css',
})
export class CategorieComponent {
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  modifiercategorie(id: number): void {
    this.categorieService.getcategorie(id).subscribe((categorie) => {
      const dialogRef = this.dialog.open(AjoutModifeCategorieComponent, {
        height: '650px',
        panelClass: 'custom-dialog-container',
        data: {
          categorie: categorie,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        // Handle any result from the dialog here
      });
    });
  }
  supprimercategorie(id: number): void {
    if (confirm('Voulez vous supprimer cette catégorie')) {
      this.categorieService.supprimercategorie(id).subscribe(() => {});
    }
  }
  categorie: Categorie[] = [];
  displayedColumns: string[] = ['id', 'nom', 'SousCategorie', 'Action'];
  dataSource: Categorie[] = [];
  isLoadingResults = true;

  constructor(
    private dialog: MatDialog,
    private categorieService: CategorieService
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutModifeCategorieComponent, {
      height: '650px',
      panelClass: 'custom-dialog-container',
      data: {
        /* any data you want to pass to the dialog */
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Handle any result from the dialog here
    });
  }
}
