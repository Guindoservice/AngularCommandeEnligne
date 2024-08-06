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
import { error } from 'highcharts';


export interface Categorie{
    id : number
    libelle: string
}
export interface SousCategorie{
  id : number
  libelle: string
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
 
myForm : FormGroup;
  Category: Categorie []= [];
  Sous_categorie: SousCategorie []= [];
  isEditMode!: boolean;


  constructor(
    public dialogRef: MatDialogRef<AjoutModifeCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private formbuilder: FormBuilder,
  ) {
    this.myForm = this.formbuilder.group ({
      libelle:['',Validators.required]
    })
    this.isEditMode= !!data.id;
    this.myForm =this.formbuilder.group({
      id: [data.id || ''],
      libelle: [data.libelle ||''],
    });
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      this.http.post("http://localhost:8080/admin/categories", this.myForm.value).subscribe((reponse) => {
         // Assurez-vous que 'result' existe dans la réponse
          console.log('Categorie ajouté avec succès');
        }, error => {
        console.log("Erreur de soumission", error);
       
      });
    }this.dialogRef.close();
  }
   onNoClick(): void {
    this.dialogRef.close();
  }
    
}
