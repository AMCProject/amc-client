import { Component } from '@angular/core';
import { MealDto } from 'src/app/models/dtos/MealDto';
import { MealService } from 'src/app/services/meals/meal.service';

@Component({
  selector: 'amc-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent {

  meals: MealDto[];
  errorMsg: string;

  constructor(
    private mealsService: MealService
  ) {

  }

  ngOnInit() {
    this.mealsService.meals.subscribe(meals => this.meals = meals);
    this.mealsService.errorMsg.subscribe(em => this.errorMsg = em);
  }


}
