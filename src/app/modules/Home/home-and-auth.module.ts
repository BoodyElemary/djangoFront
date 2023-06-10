import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: SignInComponent },
      { path: 'signup', component: RegisterComponent },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CarouselModule,
    HttpClientModule,
  ],
})
export class HomeAndAuthModule {}
