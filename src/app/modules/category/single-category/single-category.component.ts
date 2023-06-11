import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackDjangoService } from 'src/app/services/Back-Django.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent {


  oneCategoryData : any;
  oneCategoryID:number=0

  constructor(private oneCategoryService:BackDjangoService,private router:Router , private activatedRoute:ActivatedRoute){
    this.oneCategoryID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit():void{
       this.oneCategoryData = this.oneCategoryService.getOneCategory(this.oneCategoryID).subscribe({
      next:(res)=>{this.oneCategoryData = res;
        console.log(this.oneCategoryData) },  
       })

      // this.router.navigate(['**']);

} 


}
