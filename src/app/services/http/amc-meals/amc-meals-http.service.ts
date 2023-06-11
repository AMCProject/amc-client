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

    private readonly mealPath = "/user/" + this.USER_ID + "/meal";
    private readonly mealIdPath = "/user/" + this.USER_ID + "/meal/:id";

    constructor(
        private httpClient: HttpClient
    ) {

    }

    create(mealDto: MealDto): Observable<MealDto> {
        return this.httpClient.put(this.URL + this.PORT + this.mealPath, mealDto,{params: {user_id:mealDto.user_id}}).pipe(
            map(res => res as MealDto),
            catchError(this.processError)
            );
    }

    get(mealDto: MealDto): Observable<MealDto> {
        return this.httpClient.get(this.URL + this.PORT + this.mealIdPath,{params: {user_id:mealDto.user_id, id:mealDto.id}}).pipe(
            map(res => res as MealDto),
            catchError(this.processError)
            );
    }

    list(id: string): Observable<Array<MealDto>> {
        return this.httpClient.get(this.URL + this.PORT + this.mealPath.replace(this.USER_ID, id), {params: {user_id:id}}).pipe(
            map(res => res as Array<MealDto>),
            catchError(this.processError)
            );
    }

    update(mealDto: MealDto): Observable<MealDto> {
        return this.httpClient.put(this.URL + this.PORT + this.mealIdPath, mealDto,{params: {user_id:mealDto.user_id, id:mealDto.id}}).pipe(
            map(res => res as MealDto),
            catchError(this.processError)
            );
    }

    delete(mealDto: MealDto): Observable<MealDto> {
        return this.httpClient.delete(this.URL + this.PORT + this.mealIdPath, {params: {user_id:mealDto.user_id, id:mealDto.id}}).pipe(
            map(res => res as MealDto),
            catchError(this.processError)
            );
    }


    private processError(error: any) {
        console.error(error);
        return throwError(() => new Error(error.error.error.message));
    }

}