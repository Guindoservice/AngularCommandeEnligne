// login.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authToken: string | null = '';
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    let auth = localStorage.getItem('authToken');
    if (auth != null) {
      this.router.navigateByUrl('dashboard');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.login(username, password);
    }
  }

  login(username: string, password: string): void {
    try {
      this.authService.login(username, password).subscribe(
        (res) => {
          this.authToken = this.authService.token;
          localStorage.setItem('authToken', JSON.stringify(this.authToken));
          this.loginEvent.emit(true);
          this.router.navigateByUrl('dashboard');
        },
        (error) => {
          console.log('error:', error);
        }
      );
    } catch (error) {
      console.log('error:', error);
    }
  }
}
