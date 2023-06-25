import { Injectable } from "@angular/core";
import { MealDto } from "src/app/models/dtos/MealDto";
import { AmcMealsHttpService } from "../http/amc-meals/amc-meals-http.service";
import { catchError, BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "../users/user.service";

@Injectable({
    providedIn: 'root'
})
export class MealService {

    meals: BehaviorSubject<MealDto[]> = new BehaviorSubject<MealDto[]>(null);
    apiMeals: BehaviorSubject<MealDto[]> = new BehaviorSubject<MealDto[]>(null);
    ingredients: BehaviorSubject<Map<string,Map<string,number>>> = new BehaviorSubject<Map<string,Map<string,number>>>(null);
    userId: string;
    errorMsg: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(
        private mealsHttpService: AmcMealsHttpService,
        private authService: AuthService
        ) { 

        this.authService.user.subscribe(user => {
            this.userId = user ? user.id : null

            if (user) {
                this.listMeals();
                this.getIngredients();
            } else {
                this.reset();
            }

        })
    }

    reset() {
        this.meals.next(null);
        this.ingredients.next(null);
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
            this.listMeals();
        });
    }

    getMeal(mealDto: MealDto): Observable<MealDto> {
        mealDto.user_id = this.userId
        
        return this.mealsHttpService.get(mealDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }));
    }


    listMeals() {
        this.mealsHttpService.list(this.userId)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meals: Array<MealDto>) => {
            this.errorMsg.next(null);
            this.meals.next(meals);
        });
    }

    updateMeal(mealDto: MealDto) {
        mealDto.user_id = this.userId
        this.mealsHttpService.update(mealDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meal: MealDto) => {
            this.errorMsg.next(null);
            this.listMeals();
        });
    }

    deleteMeal(mealDto: MealDto) {
        mealDto.user_id = this.userId
        this.mealsHttpService.delete(mealDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((meal: MealDto) => {
            this.errorMsg.next(null);
            this.listMeals();
        });
    }

    getIngredients() {
        this.mealsHttpService.getIngredients()
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((ingredients: Map<string,Map<string,number>>) => {
            this.errorMsg.next(null);
            this.ingredients.next(ingredients)
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