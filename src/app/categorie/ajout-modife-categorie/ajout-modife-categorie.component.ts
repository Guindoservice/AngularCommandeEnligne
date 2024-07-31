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
  templateUrl: './ajout-modife-categorie.component.html',
  styleUrls: ['./ajout-modife-categorie.component.css'],
})
export class AjoutModifeCategorieComponent {
  categorieForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AjoutModifeCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.categorieForm = this.fb.group({
      id: [data.id || '', Validators.required],
      nom: [data.nom || '', Validators.required],
      sousCategorie: [data.sousCategorie || '', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.categorieForm.valid) {
      const newProduct = {
        ...this.categorieForm.value,
        id: this.data.id,
      };
      this.http
        .post('http://localhost:3000/products', newProduct)
        .subscribe(() => {
          this.dialogRef.close(newProduct);
        });
    }
  }

  onReset(): void {
    this.categorieForm.reset();
  }
}
