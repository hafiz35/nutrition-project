import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './site/login/login.component';
import { SignUpComponent } from './site/sign-up/sign-up.component';
import { MenuComponent } from './food/menu/menu.component';
import { DisplayNutrientsComponent } from './food/display-nutrients/display-nutrients.component';
import { AuthGuard } from './services/auth.guard';
import { FavoritesComponent } from './food/favorites/favorites.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'menu', component:MenuComponent,canActivate: [AuthGuard]},
  { path: 'display-nutrients', component:DisplayNutrientsComponent,canActivate: [AuthGuard]},
  { path: 'favorites',component:FavoritesComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
