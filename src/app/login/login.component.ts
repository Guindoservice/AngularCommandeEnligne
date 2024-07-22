import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{

  public  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.loginForm=  this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })

  }

  login() {
    let username = this.loginForm.controls['username'].value;
    let password = this.loginForm.controls['password'].value;
  }
}
