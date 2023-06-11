import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { BackDjangoService } from 'src/app/services/Back-Django.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css'],
})
export class EditUserProfileComponent {
  registrationForm: FormGroup;
  submitted = false;
  message: string = '';
  successMessage: boolean = false;
  errorMessage: boolean = false;
  profileData: any;

  constructor(
    private fb: FormBuilder,
    private bacEndService: BackDjangoService
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobilePhone: [
        '',
        [Validators.required, Validators.pattern('^01[0-2|5]{1}[0-9]{8}$')],
      ],
      profilePicture: [null],
    });
  }
  ngOnInit(): void {
    this.profileData = this.bacEndService.getUserProfile().subscribe({
      next: (res: any) => {
        this.profileData = res;
        console.log(this.profileData.data);
        this.registrationForm.patchValue({
          firstName: this.profileData.data.first_name,
          lastName: this.profileData.data.last_name,
          mobilePhone: this.profileData.data.mobile_phone,
        });
        this.setProfilePicture();
      },
    });
  }
  get formData() {
    return this.registrationForm.controls;
  }

  setProfilePicture() {
    if (this.profileData.profile_picture) {
      const file = new File([], this.profileData.profile_picture);
      const profilePictureControl = this.registrationForm.get('profilePicture');
      if (profilePictureControl) {
        profilePictureControl.setValue(file);
      }
    }
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
      mobile_phone: this.formData['mobilePhone'].value,
      profile_picture: this.formData['profilePicture'].value,
    };
    console.log(requestBody);

    const formInfo = new FormData();
    formInfo.append('first_name', requestBody.first_name);
    formInfo.append('last_name', requestBody.last_name);
    formInfo.append('mobile_phone', requestBody.mobile_phone);
    if (requestBody.profile_picture) {
      formInfo.append('profile_picture', requestBody.profile_picture);
    }
    const formDataEntries: [string, string][] = [];
    formInfo.forEach((value, key) => {
      formDataEntries.push([key, value.toString()]);
    });

    console.log(formDataEntries);
    console.log(formInfo);

    this.bacEndService.editUserProject(formInfo).subscribe(
      (response: any) => {
        console.log('update successful:', response);
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
      }
    );
  }
}
