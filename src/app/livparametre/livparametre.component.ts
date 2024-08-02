import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { AjoutLivraisonComponent } from './ajoutLivraison/ajoutLivraison.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-livparametre',
  standalone: true,
  imports: [MatPaginator, MatIconModule],
  templateUrl: './livparametre.component.html',
  styleUrl: './livparametre.component.css',
})
export class LivparametreComponent {
modifier() {
throw new Error('Method not implemented.');
}
supprimer() {
throw new Error('Method not implemented.');
}


  constructor(
    private dialog: MatDialog,
  ) { }
  
  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutLivraisonComponent, {
      height: '80%',
      width: '60%',
      restoreFocus: false,
      autoFocus: false,
      closeOnNavigation: false,
      panelClass: 'custom-dialog-container',
      data: {},
    });

    dialogRef.afterClosed().subscribe(() => {
      // Add new category to the list immediately
    });
  }
}
