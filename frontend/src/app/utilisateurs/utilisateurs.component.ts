
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; // Import pour utiliser ngModel
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { UsersService } from '../users.service';

// Interface pour définir la structure d'un utilisateur
interface RoleType {
  id: number;
  nom: string;
}
interface User {
  // id: number;
  // mail: string;
  // username: string;
  // password: string;
  id:number
  username:string
  nom:string
  prenom:string
  motDePasse:string

  roleType: RoleType
  showPassword?: boolean; // Ajouter la propriété showPassword pour gérer la visibilité du mot de passe
}


@Component({
  selector: 'app-utilisateurs',
  standalone: true,

  imports: [MatTableModule, MatDividerModule, NgIf, FormsModule, MatIconModule], // Ajouter MatIconModule
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css'], // Correction du nom du fichier de style
})
export class UtilisateursComponent implements OnInit {
  isContainerVisible = false; // Indique si le formulaire d'ajout/édition est visible
  isEditing = false; // Indique si un utilisateur est en cours d'édition
  errorMessage = ''; // Stocke le message d'erreur
  users: User[] = [];
  newUser: User = { id: 0, nom: '', prenom: '',username: '',  motDePasse: '', roleType: {id:0,nom: '' } }; // Objet pour stocker les informations du nouvel utilisateur ou de l'utilisateur en cours d'édition
  displayedColumns: string[] = [
    'id',
    'nom',
    'prenom',
    'username',
    'motDePasse',
    'role',
    'action',
  ]; // Colonnes affichées dans le tableau des utilisateurs
  dataSource = new MatTableDataSource(this.users); // Source de données pour le tableau

  // Constructeur du composant
  constructor(private userService: UsersService) {}
  data:any;

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    const auth = localStorage.getItem("authToken");
    if (auth) {
      this.userService.findAll(auth).subscribe({
        next: (data: User[]) => {
          this.users = data;
          this.dataSource.data = this.users; // Mettre à jour la source de données
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des utilisateurs', err);
          this.errorMessage = 'Erreur lors de la récupération des utilisateurs';
        }
      });
    } else {
      console.error('Token d\'authentification non trouvé');
      this.errorMessage = 'Token d\'authentification non trouvé';
    }
  }

  // Afficher le formulaire d'ajout/édition
  showContainer() {
    this.isContainerVisible = true;
  }
  // Ajoutez cette méthode dans votre composant TypeScript
maskPassword(password: string): string {
  return '*'.repeat(password.length);
}

  // Cacher le formulaire d'ajout/édition et réinitialiser les valeurs
  hideContainer() {
    this.isContainerVisible = false;
    this.isEditing = false; // Réinitialiser l'état d'édition
    this.newUser = { id: 0, nom: '',prenom: '' ,username: '',  motDePasse: '', roleType: {id:0,nom: '' }  }; // Réinitialiser le formulaire
    this.errorMessage = ''; // Réinitialiser le message d'erreur
  }

    // Ajouter un nouvel utilisateur
    addUser() {
      // Vérifier que tous les champs sont remplis
      if (!this.newUser.nom || !this.newUser.prenom || !this.newUser.username || !this.newUser.motDePasse || !this.newUser.roleType) {
        this.errorMessage = 'Tous les champs doivent être remplis';
        return;
      }
  
      // Ajout d'un nouvel utilisateur
      this.newUser.id = this.users.length + 1;
      this.users.push({ ...this.newUser, showPassword: false });
      this.dataSource.data = this.users; // Mettre à jour la source de données
      this.hideContainer(); // Cacher le formulaire
    }
  
   
  
// Supprimer un utilisateur après confirmation
deleteUser(user: User) {
  const confirmation = confirm(
    'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'
  );
  console.log('Confirmation:', confirmation);
  if (confirmation) {
    this.users = this.users.filter((u) => u.id !== user.id);
    this.dataSource.data = this.users; // Mettre à jour la source de données
  }
 
  }
  

  
}
