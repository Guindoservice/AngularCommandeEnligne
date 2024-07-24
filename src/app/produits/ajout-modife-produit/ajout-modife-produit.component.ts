import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ajout-modife-produit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ajout-modife-produit.component.html',
  styleUrls: ['./ajout-modife-produit.component.css'],
})
export class AjoutModifeProduitComponent {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AjoutModifeProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      nom: [data.nom || '', Validators.required],
      prix: [data.prix || '', Validators.required],
      categorie: [data.categorie || '', Validators.required],
      sousCategorie: [data.sousCategorie || '', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.productForm.valid) {
      const newProduct = {
        ...this.data,
        ...this.productForm.value,
      };
      this.dialogRef.close(newProduct);
    }
  }
}
