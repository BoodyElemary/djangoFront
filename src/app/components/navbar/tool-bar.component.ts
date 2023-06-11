import { Component } from '@angular/core';
import { BackDjangoService } from 'src/app/services/Back-Django.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
})
export class ToolBarComponent {
  profileData: any;
  apiUrl: string = 'http://localhost:8000';
  firstName: string = '';
  lastName: string = '';
  profilePicUrl: string = '';

  constructor(
    private authService: AuthService,
    private http: BackDjangoService
  ) {}
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
  }

  logout(): void {
    this.authService.logout();
  }
}
