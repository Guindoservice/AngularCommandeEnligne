import { ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
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
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { ProduitService } from '../../Services/produit.service';
import { MatSelectChange } from '@angular/material/select';


interface souscategories{
  id:number,
  libelle:string,
  category:{"id":number, "libelle":string}
}
interface category {
  id: number;
  libelle: string;
}
interface Produit {
  id: number,
  libelle: string,
  quantite: number,
  prix: number,
  date: string,
  description: string,
  utilisateur: utilisateur,
  sousCategory:  souscategories
}
interface utilisateur {
  id: number;
  email: string;
  mot_de_passe: string;
  id_role: role;
}
interface role{
  id: number,
  nom: string
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
    MatCheckboxModule,
    MatRadioButton,
    MatIconModule,
  ],
  templateUrl: './ajout-modife-produit.component.html',
  styleUrls: ['./ajout-modife-produit.component.css'],
})
export class AjoutModifeProduitComponent  implements OnInit{
  productForm: FormGroup;
  categories: category[]=[];
  SousCategories: souscategories[] = [];
  filteredSousCategories:souscategories[]= [];
  products: Produit[] = [];
  isEditMode: boolean;
  constructor(
    public dialogRef: MatDialogRef<AjoutModifeProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private produitService:ProduitService,
  ) {
    this.isEditMode = !!data.id;
    this.productForm = this.fb.group({
      id: [data.id || ''],
      description: [data.description || '', Validators.required],
      prix: [data.prix || null, [Validators.required, Validators.min(0)]],
      quantite: [data.quantite || null, [Validators.required, Validators.min(0)]],
      libelle: [data.libelle || '', Validators.required], 
      Categorie: ['', ],
      sousCategorie: ['', Validators.required],
    });
  
  }
  ngOnInit(): void {
    this.loadCategories();
    this.loadSousCategories();
    if (this.isEditMode) {
      this.filterSousCategories(this.productForm.value.categorie);
    }
  }
  // onCategoryChange(): void {
  //   const selectedCategory: string = this.productForm.get('categorie')?.value;
  //   this.SousCategories = this.allSousCategories[selectedCategory] || [];
  //   this.showSousCategorie = this.SousCategories.length > 0;
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadCategories(): void {
    this.produitService.getCategories().subscribe(data => {
      this.categories = data;
      
      console.log('Categories loaded:', this.categories);
    }, error => {
      console.error('Error loading categories:', error);
    });
  }
  loadSousCategories(): void {
    this.produitService.getSousCategories().subscribe(data => {
      this.SousCategories = data;
    });
  }

  filterSousCategories(categoryId: number): void {
    this.filteredSousCategories = this.SousCategories.filter(
      (SousCategories) => SousCategories.category.id === categoryId
    );
  }
  onCategoryChange(event: MatSelectChange): void {
    const selectedCategoryId = event.value;
    this.filterSousCategories(selectedCategoryId);
  }

  onSave(): void {
    if (this.productForm.valid) {
      const newProduct = {
        id: this.productForm.value.id,
        description: this.productForm.value.description,
        prix: parseFloat(this.productForm.value.prix),
        quantite: parseInt(this.productForm.value.quantite, 10),
        libelle: this.productForm.value.libelle,
        sousCategory: { id: this.productForm.value.sousCategorie },
      };
      if (this.isEditMode) {
        this.produitService.modifierProduit(newProduct.id, newProduct).subscribe(data => {
          this.dialogRef.close(data);
        });
      }else{
        this.produitService.ajouterProduit(newProduct).subscribe((data) => {
        this.onNoClick();
        this.dialogRef.close(newProduct);
        this.dialogRef.close(data);
      });} 
      
    }
  }

  onReset(): void {
    this.productForm.reset();
  }

  onCheckboxChange(_t59: number, $event: MatCheckboxChange) {
    throw new Error('Method not implemented.');
  }

  checkboxes: any;
  onFileChange($event: Event) {
    throw new Error('Method not implemented.');
  }

  onVariant2Change($event: MatRadioChange) {
    throw new Error('Method not implemented.');
  }
  onVariant1Change($event: MatCheckboxChange) {
    throw new Error('Method not implemented.');
  }
}
