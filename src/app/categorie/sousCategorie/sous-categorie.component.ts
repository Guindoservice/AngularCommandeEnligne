import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CategorieService } from '../../Services/categorie.service';
import { SousCategorieService } from '../../Services/sous-categorie.service';
import { AjooutScategorieComponent } from './ajout-scategorie/ajout-scategorie.component';
import { MatDialog } from '@angular/material/dialog';

export interface Scategorie{
  id: number;
  libelle: string;
}
export interface Categorie{
  id: number;
  libelle: string;
}


@Component({
  selector: 'app-sous-categorie',
  standalone: true,
  imports: [
    // Import required modules here
    MatIconModule,
    MatPaginator,
    MatFormFieldModule, // For Material Form Field
    MatSelect, // For Material Select
    MatOptionModule, // For Material Option
  ],
  templateUrl: './sous-categorie.component.html',
  styleUrl: './sous-categorie.component.css',
})
export class SousCategorieComponent {
  categories: any[] = [];
  souscategorie: Scategorie[] = [];
  dataSource: Scategorie[] = [];
  isLoadingResults = true;

  constructor(
    private dialog: MatDialog,
    private categorieService: CategorieService,
    private sousCategorieService: SousCategorieService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.sousCategorieService
      .getSoucategorie()
      .subscribe((data: Scategorie[]) => {
        this.souscategorie = data;
        this.dataSource = data; // Ensure dataSource is updated
        this.isLoadingResults = false;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.souscategorie.filter((scategorie) =>
      scategorie.libelle.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjooutScategorieComponent, {
      height: '50%',
      panelClass: 'custom-dialog-container',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        // Add new category to the list immediately
        this.souscategorie.push(result);
        this.dataSource = [...this.souscategorie]; // Update dataSource
      }
    });
  }

  modifiercategorie(id: number): void {
  this.categorieService.getCategorie(id).subscribe((categorie) => {
    const dialogRef = this.dialog.open(AjooutScategorieComponent, {
      height: '50%',
      panelClass: 'custom-dialog-container',
      data: { categorie: categorie },
    });

    dialogRef.afterClosed().subscribe((updatedscategorie: Scategorie) => {
      if (updatedscategorie) {
        // Update the category in the list
        const index = this.souscategorie.findIndex(
          (c) => c.id === updatedscategorie.id
        );
        if (index !== -1) {
        }
      }
    });
  });
}


  supprimercategorie(id: number): void {
    if (confirm('Voulez-vous supprimer cette catégorie')) {
      this.categorieService.deleteCategorie(id).subscribe(() => {
        // Remove the category from the list immediately
        this.souscategorie = this.souscategorie.filter((c) => c.id !== id);
        this.dataSource = [...this.souscategorie]; // Update dataSource
      });
    }
  }
}
