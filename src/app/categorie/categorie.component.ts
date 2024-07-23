import { Component } from '@angular/core';
import {bootstrapApplication} from "@angular/platform-browser";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [NgIf],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent {


  Ismodal:boolean=false;

  affichemodal() {
    this.Ismodal = true;
  }

  nomodal() {
    this.Ismodal = false;
  }


}
