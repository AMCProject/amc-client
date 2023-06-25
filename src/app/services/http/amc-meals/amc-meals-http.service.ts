import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, catchError, map, throwError } from "rxjs";
import { MealDto } from "src/app/models/dtos/MealDto";

@Injectable({
    providedIn: 'root'
})
export class AmcMealsHttpService {

    private readonly URL = "http://localhost";
    private readonly PORT = ":3200";

    private readonly USER_ID = ":user_id";
    private readonly MEAL_ID = "id"

    private readonly mealPath = "/user/" + this.USER_ID + "/meal";
    private readonly mealIdPath = "/user/" + this.USER_ID + "/meal/"+this.MEAL_ID;
    private readonly ingredientsPath = "/ingredients"
    private readonly externalMealsPath = "/meals"

    constructor(
        private httpClient: HttpClient
    ) {

    }

    create(mealDto: MealDto): Observable<MealDto> {
        return this.httpClient.post(this.URL + this.PORT + this.mealPath.replace(this.USER_ID, mealDto.user_id), mealDto).pipe(
            map(res => res as MealDto),
            catchError(this.processError)
            );
    }

    get(mealDto: MealDto): Observable<MealDto> {
        return this.httpClient.get(this.URL + this.PORT + this.mealIdPath.replace(this.USER_ID, mealDto.user_id).replace(this.MEAL_ID,mealDto.id)).pipe(
            map(res => res as MealDto),
            catchError(this.processError)
            );
    }

    list(user_id: string): Observable<Array<MealDto>> {
        return this.httpClient.get(this.URL + this.PORT + this.mealPath.replace(this.USER_ID, user_id)).pipe(
            map(res => res as Array<MealDto>),
            catchError(this.processError)
            );
    }

    update(mealDto: MealDto): Observable<MealDto> {
        return this.httpClient.put(this.URL + this.PORT + this.mealIdPath.replace(this.USER_ID, mealDto.user_id).replace(this.MEAL_ID,mealDto.id), mealDto).pipe(
            map(res => res as MealDto),
            catchError(this.processError)
            );
    }

    delete(mealDto: MealDto): Observable<MealDto> {
        return this.httpClient.delete(this.URL + this.PORT + this.mealIdPath.replace(this.USER_ID, mealDto.user_id).replace(this.MEAL_ID,mealDto.id)).pipe(
            map(res => res as MealDto),
            catchError(this.processError)
            );
    }

    getIngredients(): Observable<Map<string,Map<string,number>>> {
        return this.httpClient.get(this.URL + this.PORT + this.ingredientsPath).pipe(
            map(res => {
                    const map = new Map<string,Map<string,number>>();

                    for (let o of Object.entries(res)) {
                        map.set(o[0], new Map(Object.entries(o[1])));
                    }

                    return map;
            }),
            catchError(this.processError)
            );
    }

    getAPIMeals(query: string): Observable<Array<MealDto>> {
       return this.httpClient.get(this.URL + this.PORT + this.externalMealsPath+"?q="+query).pipe(
        map(res => res as Array<MealDto>),
        catchError(this.processError)
        );
    } 
    
    private processError(error: any) {
        console.error(error);
        return throwError(() => new Error(error.error.error.message));
    }

}