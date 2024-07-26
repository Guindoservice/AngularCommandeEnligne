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


declare var $: any; 

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
    MatSortModule,
  ],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css',
})
export class ProduitsComponent implements AfterViewInit {
  constructor(private dialog: MatDialog) {}

  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      $('#example').DataTable({
        language: {
          processing: 'Traitement en cours...',
          search: 'Rechercher&nbsp;:',
          lengthMenu: 'Afficher _MENU_ &eacute;l&eacute;ments',
          info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
          infoEmpty:
            "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
          infoFiltered:
            '(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)',
          infoPostFix: '',
          loadingRecords: 'Chargement en cours...',
          zeroRecords: 'Aucun &eacute;l&eacute;ment &agrave; afficher',
          emptyTable: 'Aucune donnée disponible dans le tableau',
          paginate: {
            first: '<<',
            previous: 'Last',
            next: 'Next',
            last: '>>',
          },
          // aria: {
          //   sortAscending:
          //     ': activer pour trier la colonne par ordre croissant',
          //   sortDescending:
          //     ': activer pour trier la colonne par ordre décroissant',
          // },
        },
      });
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutModifeProduitComponent, {
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



