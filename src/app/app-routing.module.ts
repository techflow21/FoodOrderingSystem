import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookTableComponent } from './components/book-table/book-table.component';
import { NotFoundComponent } from './partials/not-found/not-found.component';
import { FoodComponent } from './pages/dashboard/food/food.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },
  //{ path: 'users', loadChildren: usersRoutes, canActivate: [authGuard] },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'category/:category', component: HomeComponent },
  { path: 'food/:id', component: FoodComponent },
  { path: 'cart', component: CartComponent },
  { path: 'book-table', component: BookTableComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  //{ path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule )},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
