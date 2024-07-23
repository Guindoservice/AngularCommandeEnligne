import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitsComponent } from './produits/produits.component';
import { CommandesComponent } from './commandes/commandes.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ClientComponent } from './client/client.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { StockComponent } from './stock/stock.component';
import { ParametresComponent } from './parametres/parametres.component';
import { SecuriteComponent } from './securite/securite.component';

export const routes: Routes = [
    {path: "dashboard", component: DashboardComponent},
    {path: "produits", component: ProduitsComponent},
    {path: "commande", component: CommandesComponent},
    {path: "livraisons", component: LivraisonComponent},
    {path: "categorie", component: CategorieComponent},
    {path: "client", component: ClientComponent},
    {path: "utilisateurs", component: UtilisateursComponent},
    {path: "stock", component: StockComponent},
    {path: "parametres", component: ParametresComponent},
    { path: '', redirectTo: '/parametres', pathMatch: 'full' },
     { path: 'securite', component: SecuriteComponent },
  {  path: '', redirectTo: '/securite', pathMatch: 'full' }  // Redirection par défaut


];
