import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';
import { SousCategorieService } from '../../../Services/sous-categorie.service';
import {SouscatInterface} from "../../SouscatInterface";

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
  private id: any;

  constructor(
    private sousCategorieService: SousCategorieService,
    public dialogRef: MatDialogRef<AjoutSousCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category_id: number },
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private router: Router,
  ) {
    this.sForm = this.fb.group({
      libelle: ['', Validators.required]
    });
  }

  onReset() {
    this.sForm.reset();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveN(): void {
    this.id = window.sessionStorage.getItem("id");
    console.log(this.id)
    if (this.sForm.valid) {
      const formValue = this.sForm.value;
      const formData = new FormData();
      formData.append('libelle', formValue.libelle);
      this.sousCategorieService.createSousCategory(formData, this.id).subscribe(reponse=>{
        console.log(reponse)
        window.location.reload()

      })
    }else {
      console.log('Forme non valide');
    }
  }
  onSave(): void {
    if (this.sForm.valid) {
      const formValue = this.sForm.value;
      const newSouscategorie : SouscatInterface  = {
        libelle: formValue.libelle,
        category_id: {
          id: this.data.category_id
        }
      };
      console.log(this.data);
console.log(newSouscategorie);
      this.sousCategorieService.createCategory(newSouscategorie).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      console.log('Forme non valide');
    }
  }


}
