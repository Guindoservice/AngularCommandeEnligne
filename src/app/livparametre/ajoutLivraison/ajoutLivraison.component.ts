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
import { HttpClient } from '@angular/common/http';
import { CategorieService } from '../../Services/categorie.service';

@Component({
  selector: 'app-ajout-modife-produit',
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
  templateUrl: './ajoutLivraison.component.html',
  styleUrls: ['./ajoutLivraison.component.css'],
})
export class AjoutLivraisonComponent {
  livraisonForm: FormGroup;
  livraisonAdded: any;

  constructor(
    public dialogRef: MatDialogRef<AjoutLivraisonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private categorieService: CategorieService
  ) {
    this.livraisonForm = this.fb.group({
      id: [{ value: data.id || '', disabled: true }],
      libelle: [data.libelle || '', Validators.required],
      prix: [data.prix || '', Validators.required],
      details: [data.details || '', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.livraisonForm.valid) {
      const formValue = this.livraisonForm.value;
      const newlivraison = {
        libelle: formValue.libelle,
        // Exclude id or manage as needed
      };
      this.http.post('', newlivraison).subscribe(
        () => {
          this.livraisonAdded.emit();
          this.dialogRef.close(newlivraison);
        },
        (error) => {
          console.error('Error saving livraison', error);
        }
      );
      this.dialogRef.close();
    }
  }

  onReset(): void {
    this.livraisonForm.reset({
      id: this.data.id || '',
      libelle: this.data.libelle || '',
      prix: this.data.prix || '',
      details: this.data.details || '',
    });
  }

}