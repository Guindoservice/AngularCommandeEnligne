import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
import {  ProductService, SousCategorie } from '../../Services/produit.service';

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

  productForm!: FormGroup;

  Product: any = {
    description:'',
    libelle:'',
    prix: '',
    quantite:'',
    souCategory: {
      id : '',
      libelle: '',
    },
   }
  
  @ViewChild('formRef') productFormRef: ElementRef | undefined;
  
  constructor(
    public dialogRef: MatDialogRef<AjoutModifeProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService,
    private http: HttpClient){}

    souscate: SousCategorie[]=[];
    onSubmite(){
      this.http.post("http://localhost:8080/admin/Creerproduit",this.Product ).subscribe((res: any)=>{
        if(res.result){
          console.log("Prduit ajouter avec succès");
        }else{
          console.log("Erreure de soumission");
        }
      });
    }
   

  ngOnInit(): void {
    this.getsousCate();
  }

  getsousCate(){
    this.productService.getsousCate().subscribe(
      (data)=>{
        this.Product=data;
      },
      (error)=>{
        console.log("Erreur lors d'affichage du produit dans stock",error)
      });
      }

  }

  

  
 

 