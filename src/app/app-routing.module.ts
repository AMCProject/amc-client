import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { AuthGuardService } from './services/users/auth-guard.service';
import { MealsComponent } from './views/meals/meals.component';
import { MealsApiComponent } from './views/meals-api/meals-api.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'auth', component: AuthenticationComponent},
  { path: 'calendar', pathMatch: 'full', component: CalendarComponent, canActivate: [AuthGuardService]},
  { path: 'meals', pathMatch: 'full', component: MealsComponent, canActivate: [AuthGuardService]},
  { path: 'meals-api', pathMatch: 'full', component: MealsApiComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
