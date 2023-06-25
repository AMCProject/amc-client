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

    private readonly USER_ID = ":user_id";

    private readonly calendarPath = "/user/" + this.USER_ID + "/calendar";
    private readonly calendarRedo = "/user/" + this.USER_ID + "/redo";
    private readonly calendarRedoWeek = "/user/" + this.USER_ID + "/redoweek";

    constructor(
        private httpClient: HttpClient
    ) {

    }

    create(id: string): Observable<Array<CalendarDto>> {
        return this.httpClient.post(this.URL + this.PORT + this.calendarPath.replace(this.USER_ID, id), null).pipe(
            map(res => res as Array<CalendarDto>),
            catchError(this.processError)
            );
    }

    get(id: string): Observable<Array<CalendarDto>> {
        return this.httpClient.get(this.URL + this.PORT + this.calendarPath.replace(this.USER_ID, id)).pipe(
            map(res => res as Array<CalendarDto>),
            catchError(this.processError)
            );
    }
    

    update(caledarDto: CalendarDto): Observable<Array<CalendarDto>> {
        return this.httpClient.put(this.URL + this.PORT + this.calendarPath.replace(this.USER_ID, caledarDto.user_id), caledarDto).pipe(
            map(res => res as Array<CalendarDto>),
            catchError(this.processError)
            );
    }

    delete(id: string): Observable<CalendarDto> {
        return this.httpClient.delete(this.URL + this.PORT + this.calendarPath.replace(this.USER_ID, id)).pipe(
            map(res => res as CalendarDto),
            catchError(this.processError)
            );
    }

    redo(id: string): Observable<Array<CalendarDto>> {
        return this.httpClient.put(this.URL + this.PORT + this.calendarRedo.replace(this.USER_ID, id), null).pipe(
            map(res => res as Array<CalendarDto>),
            catchError(this.processError)
            );
    }

    redoWeek(fromDate: string, toDate: string, id: string): Observable<Array<CalendarDto>> {
        const body = { "from": fromDate, "to": toDate };

        return this.httpClient.put(this.URL + this.PORT + this.calendarRedoWeek.replace(this.USER_ID, id), body).pipe(
            map(res => res as Array<CalendarDto>),
            catchError(this.processError)
            );
    }


    private processError(error: any) {
        console.error(error);
        return throwError(() => new Error(error.error.error.message));
    }

}