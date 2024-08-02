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
import { SousCategorieService } from '../../../Services/sous-categorie.service';


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
  templateUrl: './ajout-scategorie.component.html',
  styleUrls: ['./ajout-scategorie.component.css'],
})
export class AjooutScategorieComponent {
  ajSForm: FormGroup;
  categoryAdded: any;

  constructor(
    public dialogRef: MatDialogRef<AjooutScategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private souscategorie: SousCategorieService
  ) {
    this.ajSForm = this.fb.group({
      id: [data.id || '', Validators.required ],
      libelle: [data.libelle || '', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.ajSForm.valid) {
      const formValue = this.ajSForm.value;
      const newscategorie = {
        libelle: formValue.libelle,
        // Exclude id or manage as needed
      };
      this.http
        .post('', newscategorie)
        .subscribe(
          () => {
            this.categoryAdded.emit();
            this.dialogRef.close(newscategorie);
          },
          (error) => {
            console.error('Error saving category', error);
          }
        );
      this.dialogRef.close();
    }
  }

  onReset(): void {
    this.ajSForm.reset({
      id: this.data.id || '',
      libelle: this.data.libelle || '',
    });
  }

}
