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
import { Categorie, CategorieService } from '../Services/categorie.service';
import { AjoutModifeCategorieComponent } from '../categorie/ajout-modife-categorie/ajout-modife-categorie.component';
import { erase, error } from 'highcharts';



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
export class CategorieComponent implements OnInit {
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }
  // modifiercategorie(id: number): void {
  //   this.categorieService.getcategorie(id).subscribe((categorie) => {
  //     const dialogRef = this.dialog.open(AjoutModifeCategorieComponent, {
  //       // height: '650px',
  //       panelClass: 'custom-dialog-container',
  //       data: {
  //         categorie: categorie,
  //       },
  //     });

  //     dialogRef.afterClosed().subscribe((result) => {
  //       console.log('The dialog was closed');
  //       // Handle any result from the dialog here
  //     });
  //   });
  // }
  supprimercategorie(id: number): void {
    if (confirm('Voulez vous supprimer cette catégorie')) {
      this.categorieService.supprimercategorie(id).subscribe(() => {});
    }
  }
 listCate: Categorie[]= [];
  constructor(
    private dialog: MatDialog,
    private categorieService: CategorieService
  ) {}
  ngOnInit(): void {
    this.listecategorie();
    
  }
listecategorie(){
  this.categorieService.getcategorie().subscribe((data)=>{
    this.listCate =data;
  },
  (erase)=>{
    console.log("Erreur de l'affichage de la liste des catégories", error)
  }
);
}
Supprimercate(id: number){
  this.categorieService.supprimercategorie(id).subscribe(reponse =>{
    console.log("La catégorie a été supprimer"+id, reponse)
  },
  (error=>{
    console.log("erreur de suppression")
  })
);
}

  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  editcate(data: any){
    const dialogRef = this.dialog.open(AjoutModifeCategorieComponent, {
      height: '650px',
      panelClass: 'custom-dialog-container',
      data: {
        categorie: data,
        /* any data you want to pass to the dialog */
      },
    });
   
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
