import { Component } from '@angular/core';
import { BackDjangoService } from 'src/app/services/Back-Django.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  profileData: any;
  userProjectsData: any;
  apiUrl: string = 'http://localhost:8000';
  firstName: string = '';
  lastName: string = '';
  profilePicUrl: string = '';

  constructor(private http: BackDjangoService) {}
  ngOnInit(): void {
    this.profileData = this.http.getUserProfile().subscribe({
      next: (res: any) => {
        this.profileData = res;
        console.log(this.profileData);
        this.firstName = this.profileData.data.first_name;
        this.lastName = this.profileData.data.last_name;
        this.profilePicUrl =
          this.apiUrl + this.profileData.data.profile_picture;
        console.log(this.profilePicUrl);
      },
    });
    this.userProjectsData = this.http.getUserProject().subscribe({
      next: (res: any) => {
        this.userProjectsData = res;
        console.log(res);
      },
    });
  }
}
