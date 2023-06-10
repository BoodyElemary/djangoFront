import { trigger,state,style,transition,animate } from '@angular/animations';
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
      state('open', style({
        height: '*'
      })),
      state('closed', style({
        height: '0px'
      })),
      transition('open <=> closed', animate('0.3s ease-in-out'))
    ])
  ]
})
export class SingleProjectComponent {


  singleProjectData : any;
  categoryData : any;
  categoryid : number=0;
  projectID : number=0;


  constructor(private singleProjectService:BackDjangoService,private router:Router , private activatedRoute:ActivatedRoute){
    this.projectID = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  }


  ngOnInit():void{
    this.singleProjectData = this.singleProjectService.getOneProjects(this.projectID).subscribe({
   next:(res)=>{this.singleProjectData = res;
     console.log(this.singleProjectData) 
     this.categoryData = this.singleProjectService.getOneCategories(this.singleProjectData.category).subscribe({
       next:(res)=>{this.categoryData = res;
         console.log(this.categoryData) },  
        })
    }
    })

   
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










}
