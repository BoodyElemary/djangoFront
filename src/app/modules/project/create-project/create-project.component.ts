import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackDjangoService } from 'src/app/services/Back-Django.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {



  newProjectData : any;

  constructor(private newProjectService:BackDjangoService,private router:Router , private activatedRoute:ActivatedRoute){
  }

  ngOnInit():void{
       this.newProjectService.addOneProject(this.newProjectData).subscribe({
      next:(res)=>{this.newProjectData = res;
        console.log(this.newProjectData) },  
       })

      // this.router.navigate(['**']);

} 

}
