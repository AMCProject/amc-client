import { Injectable } from "@angular/core";
import { CalendarDto } from "src/app/models/dtos/CalendarDto";
import { AmcCalendarsHttpService } from "../http/amc-calendars/amc-calendars-http.service";
import { catchError, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    calendar: Array<CalendarDto>;
    errorMsg: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private calendarsHttpService: AmcCalendarsHttpService) { }

    createCalendar(id: string) {
        this.calendarsHttpService.create(id)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar = calendar;
            console.warn(calendar);
            // TODO REFRESH
        });
    }

    getCalendar(id: string) {
        this.calendarsHttpService.get(id)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar = calendar;
            console.warn(calendar);
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
            this.calendar = calendar;
            console.warn(calendar);
            // TODO REFRESH
        });
    }

    deleteCalendar(id: string) {
        this.calendarsHttpService.delete(id)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar = new Array<CalendarDto>
            console.warn(calendar);
            // TODO REFRESH
        });
    }

    redoCalendar(id: string) {
        this.calendarsHttpService.redo(id)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar = calendar
            console.warn(calendar);
            // TODO REFRESH
        });
    }

}