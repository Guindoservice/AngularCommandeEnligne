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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ajout-modife-produit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatIconModule,
  ],
  templateUrl: './ajout-modife-produit.component.html',
  styleUrls: ['./ajout-modife-produit.component.css'],
})
export class AjoutModifeProduitComponent {
  productForm: FormGroup;
  categories: string[] = ['Electronic', 'Vetements'];
  sousCategories: string[] = [];
  allSousCategories: { [key: string]: string[] } = {
    Electronic: ['Telephone', 'Oridnateur'],
    Vetements: ['Enfant', 'Adulte', 'Femme'],
  };

  variant1Options: string[] = [];
  variant2Options: string[] = [];
  variant1Label: string = '';
  variant2Label: string = 'Couleur';
  showSousCategorie: boolean = false;
  showVariant1: boolean = false;
  showVariant2: boolean = false; // Set default to false

  constructor(
    public dialogRef: MatDialogRef<AjoutModifeProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      nom: [data.nom || '', Validators.required],
      prix: [data.prix || '', Validators.required],
      quantite: [data.quantite || '', Validators.required],
      categorie: [data.categorie || '', Validators.required],
      sousCategorie: [data.sousCategorie || '', Validators.required],
      image: [null, Validators.required],
      variant1: [data.variant1 || []],
      variant2: [data.variant2 || '', Validators.required],
    });

    if (data.categorie) {
      this.onCategoryChange();
    }
  }

  onCategoryChange(): void {
    const selectedCategory: string = this.productForm.get('categorie')?.value;
    this.sousCategories = this.allSousCategories[selectedCategory] || [];
    this.showSousCategorie = this.sousCategories.length > 0;

    if (selectedCategory === 'Electronic') {
      this.variant1Label = 'Stockage';
      this.variant1Options = ['32Go', '64Go', '128Go'];
      this.variant2Options = []; // Add specific options for Electronic if needed
      this.showVariant2 = false; // Or set to true if needed
    } else if (selectedCategory === 'Vetements') {
      this.variant1Label = 'Taille';
      this.variant1Options = ['X', 'M'];
      this.variant2Options = ['Noir', 'Rouge']; // Example options for Vetements
      this.showVariant2 = true;
    }
    this.showVariant1 = this.variant1Options.length > 0;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.productForm.patchValue({ image: file });
  }

  onVariant1Change(event: any): void {
    const selectedOptions = this.productForm.get('variant1')?.value || [];
    if (event.checked) {
      selectedOptions.push(event.source.value);
    } else {
      const index = selectedOptions.indexOf(event.source.value);
      if (index >= 0) {
        selectedOptions.splice(index, 1);
      }
    }
    this.productForm.patchValue({ variant1: selectedOptions });
  }

  onVariant2Change(event: any): void {
    this.productForm.patchValue({ variant2: event.value });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReset(): void {
    this.productForm.reset();
  }

  onSave(): void {
    if (this.productForm.valid) {
      const newProduct = {
        ...this.data,
        ...this.productForm.value,
      };
      // Assuming a function to save the product to the table
      this.saveProduct(newProduct);
      this.dialogRef.close(newProduct);
    }
  }

  saveProduct(product: any): void {
    // Implement logic to save product to the table
  }
}
