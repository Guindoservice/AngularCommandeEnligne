import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; // Import pour utiliser ngModel
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

// Interface pour définir la structure d'un utilisateur
interface User {
  id: number;
  mail: string;
  username: string;
  password: string;
  role: string;
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
  users: User[] = [
    // Liste initiale des utilisateurs
    // {
    //   id: 1,
    //   mail: 'mail.com',
    //   username: 'adama',
    //   password: 'mdp',
    //   role: 'client',
    //   showPassword: false,
    // },
    // {
    //   id: 2,
    //   mail: 'email.com',
    //   username: 'oumou',
    //   password: 'mdp',
    //   role: 'personnel',
    //   showPassword: false,
    // },
    // {
    //   id: 3,
    //   mail: 'email.com',
    //   username: 'moussa',
    //   password: 'mdp',
    //   role: 'admin',
    //   showPassword: false,
    // },
    // {
    //   id: 4,
    //   mail: 'email.com',
    //   username: 'awa',
    //   password: 'mdp',
    //   role: 'client',
    //   showPassword: false,
    // },
    // {
    //   id: 5,
    //   mail: 'email.com',
    //   username: 'kone',
    //   password: 'mdp',
    //   role: 'admin',
    //   showPassword: false,
    // },
  ];
  newUser: User = { id: 0, mail: '', username: '', password: '', role: '' }; // Objet pour stocker les informations du nouvel utilisateur ou de l'utilisateur en cours d'édition
  displayedColumns: string[] = [
    'id',
    'mail',
    'username',
    'password',
    'role',
    'action',
  ]; // Colonnes affichées dans le tableau des utilisateurs
  dataSource = new MatTableDataSource(this.users); // Source de données pour le tableau

  // Constructeur du composant
  constructor() {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {}

  // Afficher le formulaire d'ajout/édition
  showContainer() {
    this.isContainerVisible = true;
  }

  // Cacher le formulaire d'ajout/édition et réinitialiser les valeurs
  hideContainer() {
    this.isContainerVisible = false;
    this.isEditing = false; // Réinitialiser l'état d'édition
    this.newUser = { id: 0, mail: '', username: '', password: '', role: '' }; // Réinitialiser le formulaire
    this.errorMessage = ''; // Réinitialiser le message d'erreur
  }

  // Ajouter un nouvel utilisateur ou mettre à jour un utilisateur existant
  addUser() {
    // Vérifier que tous les champs sont remplis
    if (
      !this.newUser.mail ||
      !this.newUser.username ||
      !this.newUser.password ||
      !this.newUser.role
    ) {
      this.errorMessage = 'Tous les champs doivent être remplis';
      return;
    }

    if (this.isEditing) {
      // Mise à jour de l'utilisateur existant
      const index = this.users.findIndex((user) => user.id === this.newUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.newUser, showPassword: false };
      }
    } else {
      // Ajout d'un nouvel utilisateur
      this.newUser.id = this.users.length + 1;
      this.users.push({ ...this.newUser, showPassword: false });
    }
    this.dataSource.data = this.users; // Mettre à jour la source de données
    this.hideContainer(); // Cacher le formulaire
  }

  // Préparer le formulaire pour éditer un utilisateur existant
  editUser(user: User) {
    this.newUser = { ...user };
    this.isEditing = true;
    this.showContainer(); // Afficher le formulaire
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

  // Basculer la visibilité du mot de passe
  togglePasswordVisibility(user: User) {
    user.showPassword = !user.showPassword;
  }

  // Obtenir une version masquée du mot de passe
  getMaskedPassword(password: string, showPassword: boolean): string {
    return showPassword ? password : '*'.repeat(password.length);
  }
}
