import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutModifeProduitComponent } from './produits/ajout-modife-produit/ajout-modife-produit.component';

NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    AjoutModifeProduitComponent
  ],
  imports: [
    BrowserModule,
    HttpClient,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
