import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { SingleProjectComponent } from './single-project/single-project.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';





const routes: Routes =[{
  path:'projects',
  children:[
  { path:'', component: AllProjectsComponent},
  { path:'all', component: AllProjectsComponent},
  { path:':id', component: SingleProjectComponent},
  { path:'create', component:CreateProjectComponent},
  ]
}
]

@NgModule({
  declarations: [
    AllProjectsComponent,
    SingleProjectComponent,
    CreateProjectComponent
  ],
  imports: [RouterModule.forChild(routes),
    CommonModule,MatDividerModule,MatCardModule
  ]
})
export class ProjectModule { }
