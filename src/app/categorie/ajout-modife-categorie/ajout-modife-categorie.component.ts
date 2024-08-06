import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, NgModel, Validators} from '@angular/forms';
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
import {CategorieInterface} from "../CategorieInterface";
import {SouscatInterface} from "../SouscatInterface";
import {CategorieService} from "../../Services/categorie.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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



export class AjoutModifeProduitComponent {


  catId!:number


  categorieForm!: FormGroup;

  constructor(
    private categorieService:CategorieService,
    public dialogRef: MatDialogRef<AjoutModifeProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router : Router,
    private http: HttpClient
  ) {
    this.categorieForm = this.fb.group({
     //id: ['', Validators.required],
      libelle: ['', Validators.required]
      // sousCategorie: [data.sousCategorie || '', Validators.required]

    });
  }

  onSubmit(formdata:CategorieInterface,
           formdata2:SouscatInterface){
    /*this.categorieservice.createCategory(this.cat).subscribe(reponse=>{
      console.log(reponse)
    })*/


  }







  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log(this.categorieForm)
    if (this.categorieForm.valid) {
      const formValue = this.categorieForm.value;

      // Création un objet FormData
      const formData = new FormData();
      //formData.append('id', formValue.id || '');
      //formData.append('sousCategoryLibelle', formValue.sousCategorie);
      formData.append('libelle', formValue.libelle);

      this.categorieService.createCategory(formData).subscribe(reponse=>{
        console.log(reponse)
        window.location.reload()

      })
    } else {
      console.log('Forme non valide');
    }
  }

  Update():void {
    console.log(this.categorieForm)
    if (this.categorieForm.valid) {
      this.categorieService.modifierCat(this.catId, this.categorieForm.value).subscribe(reponse => {
        console.log("Catégorie mis à jour", reponse);
      }, error => {
        console.error("Ereur dans la mis à jour", error)
      })


      window.location.reload()

    }
  }



  onSaveN(): void {
    console.log(this.categorieForm)
    if (this.categorieForm.valid) {
      const formValue = this.categorieForm.value;

      // Création d'un objet JSON
      const category = {
        libelle: formValue.libelle
      };

      this.categorieService.createCategory(category).subscribe(reponse => {
        console.log(reponse)
      });
    } else {
      console.log('Forme non valide');
    }
  }


  onReset(): void {
    this.categorieForm.reset();
  }
}
