import { Component, OnInit } from '@angular/core';
import { ParametresService } from '../Services/parametres.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajoutez les imports nécessaires ici si vous avez des modules ou des composants à importer
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  currentUser = {
    username: '',
    password: '',
    nom: '',
    prenom: '',
  };
  errorMessage = '';
  successMessage = '';
  chaine:string = '';

  constructor(private parametresService: ParametresService) {}

  ngOnInit(): void {
    // this.loadCurrentUser();
    let userString = localStorage.getItem("currentUser")
    if (userString) {
      this.currentUser = JSON.parse(userString);
    }
  }

  loadCurrentUser(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.parametresService.getCurrentUser(authToken).subscribe({
        next: (response) => {
          // Assurez-vous que `response` contient les données attendues
          this.currentUser = {
            username: response.username, // Modifiez si nécessaire
            password: '', // Exclure le mot de passe des données affichées
            nom: response.nom,
            prenom: response.prenom,
          };
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'utilisateur connecté', err);
          this.errorMessage = 'Erreur lors de la récupération de l\'utilisateur connecté';
        }
      });
    } else {
      this.errorMessage = 'Token d\'authentification manquant';
    }
  }
  updateCurrentUser(): void {
    const authToken = localStorage.getItem('authToken');
    console.log('Bonjoutr ', authToken);
    if (authToken) {
        this.parametresService.updateCurrentUser(this.currentUser, authToken).subscribe({
        
            next: (response) => {
              console.log('Bonjoutr ',   response);
                this.successMessage = 'Utilisateur mis à jour avec succès';
                this.errorMessage = ''; // Clear any previous error messages
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = 'Erreur lors de la mise à jour de l\'utilisateur connecté';
                this.successMessage = ''; // Clear any previous success messages
            }
        });
    } else {
        this.errorMessage = 'Token d\'authentification manquant';
    }
}

//   updateCurrentUser(): void {
//     const authToken = localStorage.getItem('authToken');
//     console.log('Bonjoutr ', authToken);
//     if (authToken) {
//         this.parametresService.updateCurrentUser(this.currentUser, authToken).subscribe({
        
//             next: (response) => {
//               console.log('Bonjoutr ',   response);
//                 this.successMessage = 'Utilisateur mis à jour avec succès';
//                 this.errorMessage = ''; // Clear any previous error messages
//             },
//             error: (err) => {
//                 console.error(err);
//                 this.errorMessage = 'Erreur lors de la mise à jour de l\'utilisateur connecté';
//                 this.successMessage = ''; // Clear any previous success messages
//             }
//         });
//     } else {
//         this.errorMessage = 'Token d\'authentification manquant';
//     }
// }
}