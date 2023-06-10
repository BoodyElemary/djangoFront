import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { SingleCategoryComponent } from './single-category/single-category.component';

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
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class CategoryModule {}
