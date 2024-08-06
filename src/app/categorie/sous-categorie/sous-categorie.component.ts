import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatIconButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {SousCategorieService} from '../../Services/sous-categorie.service';
import {MatDialog} from "@angular/material/dialog";
import {SouscatInterface} from "../SouscatInterface";
import {CategorieComponent} from "../categorie.component";
import {AjoutModifeProduitComponent} from "../ajout-modife-categorie/ajout-modife-categorie.component";
import {MatInput} from "@angular/material/input";
import { AjoutSousCategorieComponent } from './ajoutSousCategorie/ajoutsouscategorie.component';
import {CategorieService} from "../../Services/categorie.service";


@Component({
  selector: 'app-sous-categorie',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatIcon,
    MatTab,
    MatTabGroup,
    MatTabLabel,
    MatIconButton,
    MatPaginator,
    RouterLink,
    CategorieComponent,
    MatInput
  ],
  templateUrl: './sous-categorie.component.html',
  styleUrl: './sous-categorie.component.css'
})


export class SousCategorieComponent implements OnInit {
  id: any;
  cate: any;

filterelement($event: Event) {
throw new Error('Method not implemented.');
}

  categorie!: string;
  souscats!
    :
    SouscatInterface[] ;
  option2!:SouscatInterface[]


  constructor(private sousCategorieService: SousCategorieService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private categorieService : CategorieService,
              private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.categorieService.getCategorieById(this.id).subscribe(data =>{
      this.cate = data;
      console.log(this.cate)
    })
    //this.route.paramMap.subscribe(params => {
      //this.categorie = params.get('categorie') || '';
      //this.loadSousCategories()
    //});

  }


  /*loadSousCategories(): void {
    this.sousCategorieService.getSousCategorie().subscribe(souscats => {
      console.log('Données récupérées:', souscats); // Ajoutez cette ligne
      this.souscats = souscats.filter(souscat => souscat.category_id === this.categorie);
      console.log('Sous-catégories filtrées:', this.souscats); // Ajoute cette ligne
      this.cdRef.detectChanges(); // Appeler detectChanges après mise à jour des données
    });
  }*/

  openDialog(): void {
    this.id = this.route.snapshot.params["id"];
    window.sessionStorage.setItem("id", this.id);
    const dialogRef = this.dialog.open(AjoutSousCategorieComponent, {
      height: '50%',
      panelClass: 'custom-dialog-container',
      data: {},
    })
  }

  delSouscat(id:number){
    this.sousCategorieService.DelSousCat(id).subscribe({
      next:()=>
        console.log(`suppression réussi, ${id}`),
      error:(err)=> console.error("Echec suppression", err)
    })
    window.location.reload()
  }

}



   /* this.sousCategorie.getAllCategories().subscribe(data => {
      this.catagories = data;
    });


    this.categorieService.getAllSousCategory().subscribe(value => {
      this.souscats = value;
    });


  }

  filterelement($event: Event) {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }*/




