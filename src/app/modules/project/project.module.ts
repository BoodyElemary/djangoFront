import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { SingleProjectComponent } from './single-project/single-project.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginGuard } from 'src/app/guards/login-guard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




const routes: Routes = [
  {
    path: 'projects',
    children: [
      { path: '', component: AllProjectsComponent, canActivate: [LoginGuard] },
      { path: 'all', component: AllProjectsComponent , canActivate: [LoginGuard] },
      { path: 'create', component: CreateProjectComponent },
      { path: ':id', component: SingleProjectComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AllProjectsComponent,
    SingleProjectComponent,
    CreateProjectComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatDividerModule,
    MatCardModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProjectModule {}
