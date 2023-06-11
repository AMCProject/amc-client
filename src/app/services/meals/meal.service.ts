import { Injectable } from "@angular/core";
import { MealDto } from "src/app/models/dtos/MealDto";
import { AmcMealsHttpService } from "../http/amc-meals/amc-meals-http.service";
import { catchError, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MealService {

    meal: MealDto
    meals: Array<MealDto>
    errorMsg: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private mealsHttpService: AmcMealsHttpService) { }

    createMeal(mealDto: MealDto) {
        this.mealsHttpService.create(mealDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meal: MealDto) => {
            this.errorMsg.next(null);
            this.meals.push(meal);
            console.warn(meal);
            // TODO REFRESH
        });
    }

    getMeal(mealDto: MealDto) {
        this.mealsHttpService.get(mealDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meal: MealDto) => {
            this.errorMsg.next(null);
            this.meal = meal;
            console.warn(meal);
            // TODO REFRESH
        });
    }


    listMeals(id: string) {
        this.mealsHttpService.list(id)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meals: Array<MealDto>) => {
            this.errorMsg.next(null);
            this.meals = meals;
            console.warn(meals);
            // TODO REFRESH
        });
    }

    updateMeal(mealDto: MealDto) {
        this.mealsHttpService.update(mealDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meal: MealDto) => {
            this.errorMsg.next(null);
            const mealIndex = this.meals.findIndex(m => m.id == meal.id)
            this.meals[mealIndex] = meal
            console.warn(meal);
            // TODO REFRESH
        });
    }

    deleteMeal(mealDto: MealDto) {
        this.mealsHttpService.delete(mealDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meal: MealDto) => {
            this.errorMsg.next(null);
            this.meals = this.meals.filter(m => m.id != meal.id);
            console.warn(meal);
            // TODO REFRESH
        });
    }

}