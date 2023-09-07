import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserListComponent, AddEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserListComponent },
      { path: 'add-user', component: AddEditComponent },
      { path: 'edit-user/:id', component: AddEditComponent },
      { path: 'user-lists', redirectTo: '' },
    ]),
  ],
})
export class UsersModule {}
