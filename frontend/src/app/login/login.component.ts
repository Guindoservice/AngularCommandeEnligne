import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  public  loginForm!: FormGroup;
  authToken: string | null = '';
  isLoginFailed=false;
  @Output() loginEvent = new EventEmitter<boolean>();
  errorMessage: any;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService) {}
  ngOnInit() {
    this.loginForm=  this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
    let auth = localStorage.getItem("authToken");
    if ( auth != null) {
      this.router.navigateByUrl('dashboard');      
    }
  }
  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.authToken = this.authService.token;
        localStorage.setItem('authToken', JSON.stringify(this.authToken));
        this.loginEvent.emit(true);
        this.router.navigateByUrl('dashboard');
      },
      error: (error) => {
        this.isLoginFailed = true;
        this.errorMessage = error.message || 'Login failed. Please try again.';
        this.loginForm.patchValue({ password: '' }); // Vider le champ password seulement
       
      }
    });
  }
}


 

