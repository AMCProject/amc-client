import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealDto } from 'src/app/models/dtos/MealDto';
import { MealService } from 'src/app/services/meals/meal.service';
import { MealFormComponent } from './meal-form/meal-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'amc-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent {
  meals: MealDto[];
  filteredMeals: MealDto[];
  errorMsg: string;
  
  constructor(
    private mealsService: MealService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.mealsService.meals.subscribe(meals => {
      this.meals = meals
      this.filteredMeals = meals;
    });

    this.mealsService.errorMsg.subscribe(em => {
      this.errorMsg = em
      if (em) {
        // this.snackBar.open(em, "OK");
      }
    });
  }

  ngOnDestroy() {
    this.mealsService.errorMsg.next(null);
  }

  searchFormChange($searchForm): void {
    const name: string = $searchForm.get('name').value;
    const type: string = $searchForm.get('type').value;
    const seasons: string[] = $searchForm.get('seasons').value;
    const kcal: boolean = $searchForm.get('kcal').value;
    
    

    this.filteredMeals = this.meals.filter(m =>
      (name ? (m.name.toUpperCase().includes(name.toUpperCase())) : true)
      &&
      (type ? (m.type == type) : true)
      &&
      ((seasons && seasons.length > 0) ? (this.compareArray(m.seasons, seasons)) : true)
    );

    if (kcal) {
      this.filteredMeals.sort((a, b) => (b.kcal <= a.kcal) ? 1 : -1);
    }
    
  }

  private compareArray(arr1: string[], arr2: string[]): boolean {
    let res = false;

    arr1.forEach(el => {
      if (arr2.includes(el)) {
        res = true;
      }
    })

    return res;
  }

}
