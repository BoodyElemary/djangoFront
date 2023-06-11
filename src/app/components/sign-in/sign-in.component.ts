import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formData() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    console.log(email);
    console.log(password);
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log(response);
        if (response.login) {
          // Save the token in local storage
          localStorage.setItem('token', response.token);

          // Redirect to the desired route
          this.router.navigate(['/profile']);
        } else {
          // Handle login failure
          console.error('Login failed');
        }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
