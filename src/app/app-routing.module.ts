import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { AuthGuardService } from './services/users/auth-guard.service';
import { MealsComponent } from './views/meals/meals.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'auth', component: AuthenticationComponent},
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuardService]},
  { path: 'meals', component: MealsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
