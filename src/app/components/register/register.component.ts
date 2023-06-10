import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { BackDjangoService } from 'src/app/services/Back-Django.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  submitted = false;
  message: string = '';
  successMessage: boolean = false;
  errorMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private bacEndService: BackDjangoService
  ) {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
            ),
          ],
        ],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        mobilePhone: [
          '',
          [Validators.required, Validators.pattern('^01[0-2|5]{1}[0-9]{8}$')],
        ],
        profilePicture: [null, Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  get formData() {
    return this.registrationForm.controls;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const profilePictureControl = this.registrationForm.get('profilePicture');
      if (profilePictureControl) {
        profilePictureControl.setValue(file);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    const requestBody = {
      first_name: this.formData['firstName'].value,
      last_name: this.formData['lastName'].value,
      email: this.formData['email'].value,
      password: this.formData['password'].value,
      mobile_phone: this.formData['mobilePhone'].value,
      profile_picture: this.formData['profilePicture'].value,
    };
    console.log(requestBody);

    const formInfo = new FormData();
    formInfo.append('first_name', requestBody.first_name);
    formInfo.append('last_name', requestBody.last_name);
    formInfo.append('email', requestBody.email);
    formInfo.append('password', requestBody.password);
    formInfo.append('mobile_phone', requestBody.mobile_phone);
    formInfo.append('profile_picture', requestBody.profile_picture);
    const formDataEntries: [string, string][] = [];
    formInfo.forEach((value, key) => {
      formDataEntries.push([key, value.toString()]);
    });

    console.log(formDataEntries);
    console.log(formInfo);

    this.bacEndService.registerUser(formInfo).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        if (response.success) {
          this.errorMessage = false;
          this.successMessage = true;
          this.message = response.msg;
        } else if (!response.success) {
        }
      },
      (error) => {
        console.error('Registration error:', error);
        this.errorMessage = true;
        this.successMessage = false;
        console.log(error.error.errors.email[0]);
        this.message = error.error.errors.email[0];
      }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }
  }
}
