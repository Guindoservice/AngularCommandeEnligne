import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
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
export class AjoutModifeProduitComponent {
  variant2Label: any;
  variant2Options: any;

  productForm: FormGroup;
  categories: string[] = [];
  SousCategories: string[] = [];
  allSousCategories: { [key: string]: string[] } = {};
  showSousCategorie: boolean = false;
  showVariant2: any;
  showVariant1: any;
  variant1Label: any;
  variant1Options: any;

  constructor(
    public dialogRef: MatDialogRef<AjoutModifeProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.productForm = this.fb.group({
      id: [data.id || ''],
      nom: [data.nom || '', Validators.required],
      description: [data.description || '', Validators.required],
      prix: [data.prix || '', Validators.required],
      quantite: [data.quantite || '', Validators.required],
      categorie: [data.categorie || ''],
      sousCategorie: [data.sousCategorie || '', Validators.required],
    });

    if (data.categorie) {
      this.onCategoryChange();
    }
  }
  ngOnInit(): void {
    this.fetchCategories();
  }

  // ----------------------------------------------------------------
  fetchCategories(): void {
    this.http
      .get<{ id: number; libelle: string }[]>(
        'http://localhost:8080/admin/categories'
      )
      .subscribe(
        (response) => {
          this.categories = response.map((category) => category.libelle);
          this.categories.forEach((category) => {
            this.fetchSousCategories(category);
          });
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }

  fetchSousCategories(category: string): void {
    this.http
      .get<{ id: number; libelle: string }[]>(
        `
        http://localhost:8080/admin/${category}/sous-categorie`
      )
      .subscribe(
        (response) => {
          this.allSousCategories[category] = response.map(
            (sousCategory) => sousCategory.libelle
          );
        },
        (error) => {
          console.error('Error fetching subcategories:', error);
        }
      );
  }

  // ------------------------------------------------------------------------------------------------
  onCategoryChange(): void {
    const selectedCategory: string = this.productForm.get('categorie')?.value;
    this.SousCategories = this.allSousCategories[selectedCategory] || [];
    this.showSousCategorie = this.SousCategories.length > 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // ----------------------------------------------------------------

  onSave(): void {
    if (this.productForm.valid) {
      const newProduct = {
        ...this.productForm.value,
        id: this.data.id || this.generateId(),
      };
      console.log('Submitting product:', newProduct); // Debug log
      this.http
        .post('http://localhost:8080/admin/listesProduit', newProduct)
        .subscribe(
          (response) => {
            console.log('Submission response:', response); // Debug log
            this.dialogRef.close(newProduct);
          },
          (error) => {
            console.error('Submission error:', error); // Debug log
          }
        );
    } else {
      console.log('Form is invalid:', this.productForm); // Debug log
    }
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000);
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
