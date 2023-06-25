import { Injectable } from "@angular/core";
import { MealDto } from "src/app/models/dtos/MealDto";
import { AmcMealsHttpService } from "../http/amc-meals/amc-meals-http.service";
import { catchError, BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "../users/auth.service";
import { MealService } from "../meals/meal.service";

@Injectable({
    providedIn: 'root'
})
export class MealsApiService {

    apiMeals: BehaviorSubject<MealDto[]> = new BehaviorSubject<MealDto[]>(null);
    userId: string;
    errorMsg: BehaviorSubject<string> = new BehaviorSubject(null);
    sucessMsg: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(
        private mealsHttpService: AmcMealsHttpService,
        private authService: AuthService,
        private mealsService: MealService
        ) { 

        this.authService.user.subscribe(user => {
            this.userId = user ? user.id : null

            if (user) {
                this.getExternalMeals("");
            } else {
                this.reset();
            }

        })
    }

    reset() {
        this.apiMeals.next(null);
        this.errorMsg.next(null);
        this.userId = null;
    }

    createMeal(mealDto: MealDto) {
        mealDto.user_id = this.userId
        this.mealsHttpService.create(mealDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meal: MealDto) => {
            this.errorMsg.next(null);
            this.sucessMsg.next(meal.name + " añadido con éxito");
            this.mealsService.listMeals();
        });
    }

    getExternalMeals(query: string) {
        this.mealsHttpService.getAPIMeals(query)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meals: Array<MealDto>) => {
            this.errorMsg.next(null);
            this.apiMeals.next(meals);
        });
    }
}