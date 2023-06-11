import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BackDjangoService } from 'src/app/services/Back-Django.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  profileData: any;
  constructor(
    private authService: AuthService,
    private http: BackDjangoService
  ) {}
  isLoggedIn(): boolean {
    // this.allProjectsData = this.allProjectsService.getAllProjects().subscribe({
    //   next:(res)=>{this.allProjectsData = res;
    //     console.log(this.allProjectsData) },
    //    })

    // this.profileData = this.http.getUserProfile().subscribe({
    //   next: (res) => {
    //     this.profileData = res;
    //     console.log(this.profileData);
    //   },
    // });
    return this.authService.isLoggedIn();
  }
}
