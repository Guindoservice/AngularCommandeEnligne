import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { ProduitService } from '../../Services/produit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface SousCategory {
  id: number;
  libelle: string;
  category: { id: number; libelle: string };
}
interface Categories {
  id: number;
  libelle: string;
}
interface Produit {
  id: number;
  image: File;
  libelle: string;
  quantite: number;
  prix: number;
  date: string;
  description: string;
  utilisateur: utilisateur;
  sousCategory: SousCategory;
  cat: Categories;
}
interface utilisateur {
  id: number;
  email: string;
  mot_de_passe: string;
  id_role: role;
}
interface role {
  id: number;
  nom: string;
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
export class AjoutModifeProduitComponent implements OnInit {
  productForm: FormGroup;
  filteredSousCategories: SousCategory[] = [];
  sousCategory: SousCategory[] = [];
  categories: Categories[] = [];
  selectedFile?: File;
  imageUrl?: string;
  isEditMode: boolean;
  selectedCategoryId!: number;

  constructor(
    public dialogRef: MatDialogRef<AjoutModifeProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private produitService: ProduitService,
    private snackBar: MatSnackBar
  ) {
    this.isEditMode = !!data.id;
    this.productForm = this.fb.group({
      image: [null, Validators.required],
      description: [data.description || '', Validators.required],
      prix: [data.prix || null, [Validators.required, Validators.min(0)]],
      quantite: [
        data.quantite || null,
        [Validators.required, Validators.min(0)],
      ],
      libelle: [data.libelle || '', Validators.required],
      category: [data.categories?.id],
      sousCategory: [data.sousCategorie?.id || '', Validators.required],
    });

    if (this.data && this.data.product) {
      this.isEditMode = true;
      this.productForm.patchValue(this.data.product);
    }
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSousCategories();
    if (this.isEditMode) {
      const categoryId = this.productForm.get('category')?.value;
      if (categoryId) {
        this.filterSousCategories();
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadCategories(): void {
    this.produitService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  loadSousCategories(): void {
    this.produitService.getSousCategories().subscribe((data) => {
      this.sousCategory = data;
      console.log('SousCategories loaded:', this.sousCategory);
      if (this.isEditMode) {
        this.filterSousCategories();
      }
    });
  }

  filterSousCategories() {
    console.log(
      (this.sousCategory || []).find((sousCategorie) => sousCategorie.id)
    );
    this.filteredSousCategories = this.sousCategory.filter((sousCategorie) => {
      return (
        sousCategorie &&
        sousCategorie.category &&
        sousCategorie.category.id === this.selectedCategoryId
      );
    });
  }

  onCategoryChange(event: MatSelectChange): void {
    const selectedCategoryId = event.value;
    console.log('Selected Category ID:', selectedCategoryId);
    this.filteredSousCategories = this.sousCategory.filter(
      (sousCategory) => sousCategory.category?.id === selectedCategoryId
    );
    console.log('Filtered SousCategories:', this.filteredSousCategories);
    // ----------------------------------------------------------------
    if (this.filteredSousCategories.length === 0) {
      this.productForm.patchValue({ sousCategory: null });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });

      //
      // const reader = new FileReader();
      // reader.onload = (e: any) => {
      //   this.imagePreview = e.target.result;
      // };
      // reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      const description = this.productForm.get('description')?.value;
      if (description) formData.append('description', description);

      const prix = this.productForm.get('prix')?.value;
      if (prix) formData.append('prix', prix);

      const quantite = this.productForm.get('quantite')?.value;
      if (quantite) formData.append('quantite', quantite);

      const libelle = this.productForm.get('libelle')?.value;
      if (libelle) formData.append('libelle', libelle);

      const category = this.productForm.get('category')?.value;
      if (category) formData.append('category', category.toString());

      const sousCategoryId = this.productForm.get('sousCategory')?.value;
      if (sousCategoryId)
        formData.append('sousCategory', sousCategoryId.toString());

      const files = this.productForm.get('image')?.value;
      if (files) formData.append('files', files);

      this.produitService.ajouterProduit(formData).subscribe(
        (response) => {
          this.snackBar.open('Produit ajouté avec succès', 'Fermer', {
            duration: 2000,
            horizontalPosition: 'center',
          });
          this.dialogRef.close(true);
          this.reloadData();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
  reloadData() {
    this.ngOnInit();
  }

  onReset(): void {
    this.productForm.reset();
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
