import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
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
import { CategorieService } from '../../Services/categorie.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Category {
  id: number;
  libelle: string;
}
export interface SouscatInterface {
  Id: number;
  libelle: string;
  category: {
    id: number;
  };
}

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
  categorieForm!: FormGroup;
  isEditMode: boolean = false;
  selectedFile!: File;

  constructor(
    public dialogRef: MatDialogRef<AjoutModifeCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.isEditMode = !!data.id;
  }

  ngOnInit(): void {
    this.categorieForm = this.fb.group({
      image:[this.data.image || '',Validators.required],
      libelle: [this.data.libelle || '', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSave(): void {
    if (this.categorieForm.valid) {
      const formData = new FormData();
      formData.append('libelle', this.categorieForm.value.libelle);
      if (this.selectedFile) {
        formData.append('files', this.selectedFile);
      }

      const request = this.isEditMode
        ? this.categorieService.modifierCat(this.data.id, formData)
        : this.categorieService.createCategory(formData);

      request.subscribe({
        next: (response) => {
          this.snackBar.open(
            `Categorie ${this.isEditMode ? 'modifiée' : 'ajoutée'}`,
            'Fermer',
            {
              duration: 3000,
              horizontalPosition: 'center',
            }
          );
          this.dialogRef.close({
            action: this.isEditMode ? 'edit' : 'add',
            data: response,
          });
        },
        error: (error) => {
          console.error('Error:', error);
          this.snackBar.open("Échec de l'opération", 'Fermer', {
            duration: 3000,
          });
        },
      });
    } else {
      this.categorieForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.categorieForm.reset();
    this.selectedFile = undefined!;
  }
}
