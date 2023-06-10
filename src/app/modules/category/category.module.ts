import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';




const routes: Routes = [
  {
    path: 'category',
    children: [
      { path: '', component: AllCategoriesComponent },
      { path: 'all', component: AllCategoriesComponent },
      { path: ':id', component: SingleCategoryComponent },
    ],
  },
];

@NgModule({
  declarations: [AllCategoriesComponent, SingleCategoryComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule, MatCardModule, MatDividerModule
  ]

})
export class CategoryModule {}
