import { NgIf } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
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
  styleUrl: './categorie.component.css'
})
export class CategorieComponent implements AfterViewInit {
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
    const dialogRef = this.dialog.open(CategorieComponent, {
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



