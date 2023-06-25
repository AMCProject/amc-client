import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealDto } from 'src/app/models/dtos/MealDto';
import { MealDialogComponent } from '../meal-dialog/meal-dialog.component';
import { MealService } from 'src/app/services/meals/meal.service';
import { MealFormComponent } from '../meal-form/meal-form.component';


@Component({
  selector: 'meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent {


  constructor(
    private dialog: MatDialog,
    private mealService: MealService,
    ) { 
      
  }

  @Input()
  meal: MealDto

  openMeal() {
    this.dialog.open(MealDialogComponent, { data: this.meal })
  }

  updateMeal() {
    this.dialog.open(MealFormComponent, { data: this.meal })
  }

  deleteMeal() {
    this.mealService.deleteMeal(this.meal)
  }
}
