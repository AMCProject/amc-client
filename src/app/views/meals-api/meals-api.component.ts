import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealDto } from 'src/app/models/dtos/MealDto';
import { MealService } from 'src/app/services/meals/meal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MealsApiService } from 'src/app/services/meals-api/meals-api.service';


@Component({
  selector: 'amc-meals-api',
  templateUrl: './meals-api.component.html',
  styleUrls: ['./meals-api.component.scss']
})
export class MealsApiComponent {
  meals: MealDto[];
  filteredMeals: MealDto[];
  errorMsg: string;
  successMsg: string;
  
  constructor(
    private mealsApiService: MealsApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.mealsApiService.apiMeals.subscribe(meals => {
      this.meals = meals
      this.filteredMeals = meals;
    });

    this.mealsApiService.errorMsg.subscribe(em => {
      this.errorMsg = em
      if (em) {
        this.snackBar.open(em, "OK");
      }
    });

    this.mealsApiService.sucessMsg.subscribe(m => {
      this.successMsg = m
      if (m) {
        this.snackBar.open(m, "OK")
      }
    });
  }

  ngOnDestroy() {
    this.mealsApiService.sucessMsg.next(null);
    this.mealsApiService.errorMsg.next(null);
  }

  searchFormChange($searchForm): void {
    const name: string = $searchForm.get('name').value;

    this.mealsApiService.getExternalMeals(name);
  }

}
