import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './views/calendar/calendar.component';
import { HeaderComponent } from './common/header/header.component';
import { MealsComponent } from './views/meals/meals.component';
import { CalendarDayComponent } from './views/calendar/calendar-day/calendar-day.component';
import { CalendarWeekComponent } from './views/calendar/calendar-week/calendar-week.component';
import { MealDialogComponent } from './views/meals/meal-dialog/meal-dialog.component';
import { MealCardComponent } from './views/meals/meal-card/meal-card.component';
import { CalendarEditMealComponent } from './views/calendar/calendar-edit-meal/calendar-edit-meal.component';
import { MealFormComponent } from './views/meals/meal-form/meal-form.component';
import { MealSearchComponent } from './views/meals/meal-search/meal-search.component';
import { MealSelectIngredientsComponent } from './views/meals/meal-select-ingredients/meal-select-ingredients.component';
import { PdfComponent } from './views/calendar/pdf/pdf.component';
import { MealsApiComponent } from './views/meals-api/meals-api.component';
import { MealsApiCardComponent } from './views/meals-api/meals-api-card/meals-api-card.component';
import { MealsApiDialogComponent } from './views/meals-api/meals-api-dialog/meals-api-dialog.component';
import { MealsApiSearchComponent } from './views/meals-api/meals-api-search/meals-api-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    CalendarComponent,
    MealsComponent,
    CalendarDayComponent,
    CalendarWeekComponent,
    MealDialogComponent,
    MealCardComponent,
    CalendarEditMealComponent,
    MealFormComponent,
    MealSearchComponent,
    MealSelectIngredientsComponent,
    PdfComponent,
    MealsApiComponent,
    MealsApiCardComponent,
    MealsApiDialogComponent,
    MealsApiSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
