import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackDjangoService } from 'src/app/services/Back-Django.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent {


  allCategoriesData : any;

  constructor(private allCategoriesService:BackDjangoService,private router:Router , private activatedRoute:ActivatedRoute){
  }

  ngOnInit():void{
       this.allCategoriesData = this.allCategoriesService.getAllCategories().subscribe({
      next:(res)=>{this.allCategoriesData = res;
        console.log(this.allCategoriesData) },
       })

      // this.router.navigate(['**']);

}

  // editProfile(){
  //   this.router.navigate(['jobDetails/4'])
  // }
  // showResults(){
  //   this.router.navigate([`profile/${this.profileID}/results`])
  // }


}
