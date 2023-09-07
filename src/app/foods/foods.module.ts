import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from './add-edit/add-edit.component';
import { FoodListComponent } from './food-list/food-list.component';



@NgModule({
  declarations: [
    AddEditComponent,
    FoodListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FoodsModule { }
