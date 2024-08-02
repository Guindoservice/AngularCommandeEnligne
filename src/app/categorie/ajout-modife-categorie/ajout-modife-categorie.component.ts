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
  templateUrl: './ajout-modife-categorie.component.html',
  styleUrls: ['./ajout-modife-categorie.component.css'],
})
export class AjoutModifeCategorieComponent {
  categorieForm: FormGroup;
  categoryAdded: any;

  constructor(
    public dialogRef: MatDialogRef<AjoutModifeCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private categorieService: CategorieService
  ) {
    this.categorieForm = this.fb.group({
      id: [{ value: data.id || '', disabled: true }],
      libelle: [data.libelle || '', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.categorieForm.valid) {
      const formValue = this.categorieForm.value;
      const newcategorie = {
        libelle: formValue.libelle,
        // Exclude id or manage as needed
      };
      this.http
        .post('http://localhost:8080/admin/creer-categories', newcategorie)
        .subscribe(
          () => {
             this.categoryAdded.emit();
            this.dialogRef.close(newcategorie);
          },
          (error) => {
            console.error('Error saving category', error);
          }
        );
      this.dialogRef.close();
    }
  }

  onReset(): void {
    this.categorieForm.reset({
      id: this.data.id || '',
      libelle: this.data.libelle || '',
    });
  }

  refreshCategories(): void {
    this.categorieService.getCategories().subscribe(
      (categories) => {
        // Handle the updated categories here
        console.log('Categories refreshed', categories);
      },
      (error) => {
        console.error('Error refreshing categories', error);
      }
    );
  }
}