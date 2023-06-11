import { Injectable } from "@angular/core";
import { CalendarDto } from "src/app/models/dtos/CalendarDto";
import { AmcCalendarsHttpService } from "../http/amc-calendars/amc-calendars-http.service";
import { catchError, BehaviorSubject, Observable, of } from "rxjs";
import { AuthService } from "../users/auth.service";

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    calendar: BehaviorSubject<Array<CalendarDto>> = new BehaviorSubject<Array<CalendarDto>>(null);
    userId: string;
    errorMsg: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(
        private calendarsHttpService: AmcCalendarsHttpService,
        private authService: AuthService
        ) { 
            this.authService.user.subscribe(user => {
                this.userId = user ? user.id : null
                this.getCalendar();
            })
        }

    createCalendar() {
        this.calendarsHttpService.create(this.userId)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar.next(calendar);
            // TODO REFRESH
        });
    }

    getCalendar(): void {
        this.calendarsHttpService.get(this.userId)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar.next(calendar);
            // TODO REFRESH
        });
    }


    updateCalendar(calendarDto: CalendarDto) {
        this.calendarsHttpService.update(calendarDto)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar.next(calendar);
            // TODO REFRESH
        });
    }

    deleteCalendar() {
        this.calendarsHttpService.delete(this.userId)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar.next(null);
            // TODO REFRESH
        });
    }

    redoCalendar() {
        this.calendarsHttpService.redo(this.userId)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar.next(calendar);
            // TODO REFRESH
        });
    }

}