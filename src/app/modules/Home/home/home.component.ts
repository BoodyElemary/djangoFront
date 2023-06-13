import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BackDjangoService } from 'src/app/services/Back-Django.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private http: BackDjangoService) {}
  topProjectsData: any;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
  };
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.topProjectsData = this.http.getTopRatedProjects().subscribe({
      next: (res: any) => {
        console.log(res);
        this.topProjectsData = res;
        console.log(this.topProjectsData);
      },
    });
  }
}
