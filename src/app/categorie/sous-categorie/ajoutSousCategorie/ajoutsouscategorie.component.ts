import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SousCategorieService } from '../../../Services/sous-categorie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajout-sous-categorie',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatDialogContent,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './ajoutsouscategorie.component.html',
  styleUrls: ['./ajoutsouscategorie.component.css'],
})
export class AjoutSousCategorieComponent {
  sForm: FormGroup;

  constructor(
    private sousCategorieService: SousCategorieService,
    public dialogRef: MatDialogRef<AjoutSousCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.sForm = this.fb.group({
      libelle: [this.data.libelle || '', Validators.required],
      category: [this.data.category?.id || null, Validators.required],
    });
  }

  onReset() {
    this.sForm.reset();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.sForm.valid) {
      const formValue = this.sForm.value;
      const newSouscategorie = {
        Id: 0,
        libelle: formValue.libelle,
        category: { id: formValue.category }, 
      };

      console.log('Payload being sent:', newSouscategorie); 

      this.sousCategorieService
        .createSousCategory(newSouscategorie) 
        .subscribe({
          next: () => {
            this.snackBar.open('SousCategorie ajoutée avec succès', 'Fermer', {
              duration: 3000,
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.snackBar.open(
              "Erreur lors de l'ajout de la SousCategorie",
              'Fermer',
              { duration: 3000 }
            );
          },
        });
    } else {
      console.log('Forme non valide');
    }
  }
}
