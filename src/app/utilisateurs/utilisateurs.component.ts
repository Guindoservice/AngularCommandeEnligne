import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../utilisateurs/user';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    MatTableModule,
    ToastModule,
    FormsModule,
    NgIf,
    NgFor,
    MatPaginatorModule,
    ConfirmPopupModule,
  ],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class UtilisateursComponent implements OnInit, AfterViewInit {
  filterelement(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
  isContainerVisible = false;
  errorMessage = '';
  users: User[] = [];
  newUser: User = {
    id: 0,
    email: '',
    username: '',
    motDePasse: '',
    roleType: { nom: '' },
  };
  userType: string = '';
  displayedColumns: string[] = ['id', 'email', 'username', 'role', 'action'];
  dataSource = new MatTableDataSource<User>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService // Add this
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    let auth = localStorage.getItem('authToken');
    if (auth) {
      this.userService.findAll().subscribe({
        next: (data) => {
          this.users = data;
          this.dataSource.data = this.users;
        },
        error: (err) => console.log(err),
      });
    }
  }

  showContainer() {
    this.isContainerVisible = true;
  }

  hideContainer() {
    this.isContainerVisible = false;
    this.resetNewUser();
  }

  resetNewUser() {
    this.newUser = {
      id: 0,
      email: '',
      username: '',
      motDePasse: '',
      roleType: { nom: '' },
    };
    this.userType = '';
    this.errorMessage = '';
  }

  addUser(form: NgForm, event: Event) {
    if (form.invalid) {
      this.errorMessage = 'Tous les champs doivent être remplis correctement';
      return;
    }

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Êtes-vous sûr de vouloir ajouter cet utilisateur ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let auth = localStorage.getItem('authToken');
        if (auth) {
          let addUserObservable;
          if (this.userType === 'admin') {
            addUserObservable = this.userService.addAdmin(this.newUser);
          } else if (this.userType === 'personnel') {
            addUserObservable = this.userService.addPersonnel(this.newUser);
          }

          if (addUserObservable) {
            addUserObservable.subscribe({
              next: (response) => {
                console.log(response.body); // Vous pouvez vérifier la réponse ici
                this.loadUsers(); // Recharger les utilisateurs après ajout
                this.hideContainer(); // Cacher le formulaire après ajout
                this.messageService.add({
                  severity: 'success',
                  summary: 'Succès',
                  detail: 'Utilisateur ajouté avec succès',
                  
                });
              },
              error: (err) => console.log(err),
            });
          }
        }
      },
    });
  }

  deleteUser(user: User, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let auth = localStorage.getItem('authToken');
        if (auth) {
          this.userService.deleteUser(user.id).subscribe({
            next: () => {
              this.loadUsers();
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Utilisateur supprimé',
              });
            },
            error: (err) => console.log(err),
          });
        }
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
