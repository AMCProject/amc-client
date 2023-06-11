import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, catchError, map, throwError } from "rxjs";
import { CalendarDto } from "src/app/models/dtos/CalendarDto";

@Injectable({
    providedIn: 'root'
})
export class AmcCalendarsHttpService {

    private readonly URL = "http://localhost";
    private readonly PORT = ":3300";

    private readonly calendarPath = "/user/:user_id/calendar";
    private readonly calendarRedo = "/user/:user_id/redo";

    constructor(
        private httpClient: HttpClient
    ) {

    }

    create(id: string): Observable<Array<CalendarDto>> {
        return this.httpClient.post(this.URL + this.PORT + this.calendarPath, null, {params: {user_id:id}}).pipe(
            map(res => res as Array<CalendarDto>),
            catchError(this.processError)
            );
    }

    get(id: string): Observable<Array<CalendarDto>> {
        return this.httpClient.get(this.URL + this.PORT + this.calendarPath, {params: {user_id:id}}).pipe(
            map(res => res as Array<CalendarDto>),
            catchError(this.processError)
            );
    }
    

    update(caledarDto: CalendarDto): Observable<Array<CalendarDto>> {
        return this.httpClient.put(this.URL + this.PORT + this.calendarPath, caledarDto, {params: {user_id:caledarDto.user_id}}).pipe(
            map(res => res as Array<CalendarDto>),
            catchError(this.processError)
            );
    }

    delete(id: string): Observable<CalendarDto> {
        return this.httpClient.delete(this.URL + this.PORT + this.calendarPath, {params: {user_id:id}}).pipe(
            map(res => res as CalendarDto),
            catchError(this.processError)
            );
    }

    redo(id: string): Observable<Array<CalendarDto>> {
        return this.httpClient.put(this.URL + this.PORT + this.calendarRedo, null, {params: {user_id:id}}).pipe(
            map(res => res as Array<CalendarDto>),
            catchError(this.processError)
            );
    }


    private processError(error: any) {
        console.error(error);
        return throwError(() => new Error(error.error.error.message));
    }

}