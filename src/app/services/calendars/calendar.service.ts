import { Injectable } from "@angular/core";
import { CalendarDto } from "src/app/models/dtos/CalendarDto";
import { AmcCalendarsHttpService } from "../http/amc-calendars/amc-calendars-http.service";
import { catchError, BehaviorSubject, Observable, of } from "rxjs";
import { AuthService } from "../users/user.service";

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    calendar: BehaviorSubject<Array<CalendarDto>> = new BehaviorSubject<Array<CalendarDto>>(null);
    userId: string;
    errorMsg: BehaviorSubject<string> = new BehaviorSubject(null);
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    currentDay = this.getCurrentDay();

    constructor(
        private calendarsHttpService: AmcCalendarsHttpService,
        private authService: AuthService
        ) { 
            this.authService.user.subscribe(user => {
                this.userId = user ? user.id : null
                if (!user) {
                    this.reset();
                }
            })
        }

    
    private reset() {
        this.calendar.next(null);
        this.errorMsg.next(null);
        this.loading.next(false);
    }

    createCalendar() {
        this.loading.next(true);
        this.calendarsHttpService.create(this.userId)
        .pipe(catchError(error => {
            this.errorMsg.next(error);
            this.loading.next(false);
            return [];
        }))
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar.next(calendar);
            this.loading.next(false);
        });
    }

    getCalendar(): void {
        this.loading.next(true);
        
        this.calendarsHttpService.get(this.userId)
        .pipe(
            catchError(error => {
                if(error.toString() != "Error: calendar not found") {
                    this.errorMsg.next(error);
                }
                this.loading.next(false);
                return [];
            })
        )
        .subscribe((calendar: Array<CalendarDto>) => {
            this.errorMsg.next(null);
            this.calendar.next(calendar);
            this.loading.next(false);
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

    redoWeekCalendar(fromDate: string, toDate: string) {
        this.calendarsHttpService.redoWeek(fromDate, toDate, this.userId)
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

    private getCurrentDay(): string {
        const dateObj = new Date();
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();

        const monthNumber = dateObj.getUTCMonth() + 1;
        const month = (monthNumber < 10) ? '0' + monthNumber.toString() : monthNumber.toString();

        return year + "/" + month + "/" + day;
    }

}