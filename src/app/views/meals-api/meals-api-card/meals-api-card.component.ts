import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealDto } from 'src/app/models/dtos/MealDto';
import { MealsApiDialogComponent } from '../meals-api-dialog/meals-api-dialog.component';
import { MealService } from 'src/app/services/meals/meal.service';
import { MealsApiService } from 'src/app/services/meals-api/meals-api.service';


@Component({
  selector: 'meals-api-card',
  templateUrl: './meals-api-card.component.html',
  styleUrls: ['./meals-api-card.component.scss']
})
export class MealsApiCardComponent {


  constructor(
    private dialog: MatDialog,
    private mealsApiService: MealsApiService,
    ) { 
      
  }

  @Input()
  meal: MealDto

  openMeal() {
    this.dialog.open(MealsApiDialogComponent, { data: this.meal })
  }

  navigateToMeal() {
    window.open(this.meal.description, "_blank");
  }

  addMeal() {
    this.mealsApiService.createMeal(this.meal);
  }

}
