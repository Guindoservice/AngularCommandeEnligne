import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitsComponent } from './produits/produits.component';
import { CommandesComponent } from './commandes/commandes.component';
import { LivraisonComponent } from './livraison/livraison.component';
// import { CategorieComponent } from './categorie/categorie.component';
import { ClientComponent } from './client/client.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { StockComponent } from './stock/stock.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ParametresComponent } from './parametres/parametres.component';
import {LoginComponent} from "./login/login.component";
import { SecuriteComponent } from './securite/securite.component';
import {PayementComponent} from "./payement/payement.component";
import { PersonnelComponent } from './personnel/personnel.component';
import {SousCategorieComponent} from "./categorie/sous-categorie/sous-categorie.component";

// @ts-ignore
export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path: "produits", component: ProduitsComponent},
  {path: "commande", component: CommandesComponent},
  {path: "livraisons", component: LivraisonComponent},

  {path: "categorie", component: CategorieComponent},
  {path: "client", component: ClientComponent},
  {path: "utilisateurs", component: UtilisateursComponent},
  {path: "stock", component: StockComponent},
  {path: "parametres", component: ParametresComponent},
  {path: "payement", component: PayementComponent},
  {path: "personnel", component:PersonnelComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'securite', component: SecuriteComponent },
  {path: 'sousCategories/:id', component: SousCategorieComponent}
];
