import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [MatTableModule,MatDividerModule, NgIf],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent  {
  
  isContainerVisible = false;

  showContainer() {
    this.isContainerVisible = true;
  }

  hideContainer() {
    this.isContainerVisible = false;
  }

}
