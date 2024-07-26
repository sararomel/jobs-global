import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[FormsModule,CommonModule,ReactiveFormsModule],
  standalone:true
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder , private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.router.navigate(['/'])
    if (this.loginForm.valid) {
      // Example login logic
      // Call authentication service to log in
      const { email, password } = this.loginForm.value;
      // Assume `authService` is a service you use for authentication
      // this.authService.login(email, password).subscribe({
      //   next: (response) => {
      //     // Handle successful login
      //     console.log('Login successful', response);
      //     // Navigate to another page, store tokens, etc.
      //   },
      //   error: (error) => {
      //     // Handle login error
      //     console.error('Login failed', error);
      //   }
      // });
    } else {
      console.log('Form is invalid');
    }
  }
  
}
