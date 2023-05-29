import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private fb: FormBuilder) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get formData() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    console.warn(this.loginForm.value);
  }
}
