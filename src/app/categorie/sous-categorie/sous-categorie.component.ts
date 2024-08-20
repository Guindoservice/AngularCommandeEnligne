import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatIconButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { SousCategorieService } from '../../Services/sous-categorie.service';
import { MatDialog } from '@angular/material/dialog';
import { CategorieComponent } from '../categorie.component';
import { MatInput } from '@angular/material/input';
import { AjoutSousCategorieComponent } from './ajoutSousCategorie/ajoutsouscategorie.component';
import { CategorieService } from '../../Services/categorie.service';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Souscatgeorie {
  id: number;
  libelle: string;
}

@Component({
  selector: 'app-sous-categorie',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatIcon,
    MatTab,
    MatTabGroup,
    MatTabLabel,
    MatIconButton,
    MatPaginator,
    RouterLink,
    CategorieComponent,
    MatInput,
  ],
  templateUrl: './sous-categorie.component.html',
  styleUrl: './sous-categorie.component.css',
})
export class SousCategorieComponent implements OnInit {
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  id: any;
  cate: any;

  categorie!: string;
  souscats!: Souscatgeorie[];
  option2!: Souscatgeorie[];

  constructor(
    private sousCategorieService: SousCategorieService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private categorieService: CategorieService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.categorieService.getCategorieById(this.id).subscribe((data) => {
      this.cate = data;
    });
  }

  openDialog(): void {
    this.id = this.route.snapshot.params['id'];
    window.sessionStorage.setItem('id', this.id);
    const dialogRef = this.dialog.open(AjoutSousCategorieComponent, {
      height: '50%',
      panelClass: 'custom-dialog-container',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadData();
      }
    });
  }

  delSouscat(id: number) {
    this.sousCategorieService.DelSousCat(id).subscribe({
      next: () => {
        this.snackBar.open('Suppression réussie', 'Fermer', { duration: 3000 });
        
      },
      error: (err) => {
        this.snackBar.open('Echec de la suppression', 'Fermer', {
          duration: 3000,
        });
        this.reloadData();
      },
    });
  }

  editSousCategory(id: number) {
    this.sousCategorieService.getOneSousCat(id).subscribe({
      next: (souscategorie) => {
        const dialogRef = this.dialog.open(AjoutSousCategorieComponent, {
          width: '400px',
          data: {
            libelle: souscategorie.libelle, 
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.sousCategorieService
              .UpdateSousCat(result.libelle, { ...result, libelle: result.libelle })
              .subscribe({
                next: () => {
                  this.snackBar.open('Modification réussie', 'Fermer', {
                    duration: 3000,
                  });
                  this.reloadData();
                },
                error: (err) => {
                  this.snackBar.open('Echec de la modification', 'Fermer', {
                    duration: 3000,
                  });
                },
              });
          }
        });
      },
      error: (err) => {
        this.snackBar.open('Echec de récupération de la catégorie', 'Fermer', {
          duration: 3000,
        });
        console.error('Echec de récupération de la catégorie', err);
      },
    });
  }

  reloadData(): void {
    this.ngOnInit();
  }
}
