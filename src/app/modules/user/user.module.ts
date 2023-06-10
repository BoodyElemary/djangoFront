import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';



const routes: Routes =[{
  path:'profile',
  children:[
  { path:':id', component: UserProfileComponent},
  { path:'edit/:id', component: EditUserProfileComponent},
  ]
}
]

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class UserModule { }
