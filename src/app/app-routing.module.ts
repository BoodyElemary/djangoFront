import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryModule } from './modules/category/category.module';
import { ProjectModule } from './modules/project/project.module';
import { HomeAndAuthModule } from './modules/Home/home-and-auth.module';
import { UserModule } from './modules/user/user.module';
import { Notfound404Module } from './modules/404/notfound404.module';


const routes: Routes = [


];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserModule, CategoryModule, ProjectModule, HomeAndAuthModule, Notfound404Module],
  exports: [RouterModule],
  declarations: [
  ],
})
export class AppRoutingModule {}
