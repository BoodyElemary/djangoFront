import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginGuard } from 'src/app/guards/login-guard.guard';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  {
    path: 'profile',
    children: [
      { path: '', component: UserProfileComponent, canActivate: [LoginGuard] },
      {
        path: 'edit',
        component: EditUserProfileComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [UserProfileComponent, EditUserProfileComponent],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
})
export class UserModule {}
