import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackDjangoService } from 'src/app/services/Back-Django.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent {



  allProjectsData : any;

  constructor(private allProjectsService:BackDjangoService,private router:Router , private activatedRoute:ActivatedRoute){
  }

  ngOnInit():void{
       this.allProjectsData = this.allProjectsService.getAllProjects().subscribe({
      next:(res)=>{this.allProjectsData = res;
        console.log(this.allProjectsData) },  
       })

      // this.router.navigate(['**']);

} 

}
