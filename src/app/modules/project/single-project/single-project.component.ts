import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BackDjangoService } from 'src/app/services/Back-Django.service';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css'],
  animations: [
    trigger('autoHeight', [
      state(
        'open',
        style({
          height: '*',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
        })
      ),
      transition('open <=> closed', animate('0.3s ease-in-out')),
    ]),
  ],
})
export class SingleProjectComponent {
  comment:any
  amountToDonate: any;
  singleProjectData: any;
  singleProjectDonationData: any;
  currentDonations: number=0;
  categoryData: any;
  categoryid: number = 0;
  projectID: number = 0;

  constructor(
    private singleProjectService: BackDjangoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.projectID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    console.log(this.projectID);
    
    this.singleProjectData = this.singleProjectService
      .getOneProject(this.projectID)
      .subscribe({
        next: (res: any) => {
          this.singleProjectData = res;
          console.log(this.singleProjectData);
        },
      });

      this.singleProjectDonationData = this.singleProjectService
      .getOneProjectDonation(this.projectID)
      .subscribe({
        next: (res: any) => {
          this.singleProjectDonationData = res;
          // console.log(this.singleProjectDonationData);
          this.singleProjectDonationData.data.forEach((item: any) => { this.currentDonations += Number(item.money) });
          // console.log(this.currentDonations);
          
        },
      });

    // this.router.navigate(['**']);
  }

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
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
  };



  donate() {
    this.amountToDonate = Number(prompt("Enter the amount you want to donate:"))

    this.singleProjectService
    .addOneProjectDonation(this.amountToDonate,this.projectID)
    .subscribe({
      next: (res: any) => { console.log(res);
          
      },
    });
  }



  sendComment() {
    this.comment =(<HTMLInputElement>document.getElementById("comment")).value
 
    const formComment = new FormData();
    formComment.append("comment",this.comment)
    
    console.log(formComment.get("comment"));
    
    this.singleProjectService
    .addOneProjectComment(formComment,this.projectID)
    .subscribe({
      next: (res: any) => { console.log(res)},
    });
  }
}
