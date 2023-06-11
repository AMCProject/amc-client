import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarDto } from 'src/app/models/dtos/CalendarDto';
import { UserDto } from 'src/app/models/dtos/UserDto';
import { CalendarService } from 'src/app/services/calendars/calendar.service';
import { AuthService } from 'src/app/services/users/auth.service';

@Component({
  selector: 'amc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  calendar: CalendarDto[];
  errorMsg: string;

  private readonly WEEK_DAYS = 7;

  constructor(
    private calendarService: CalendarService
  ) {

  }

  ngOnInit() {
    this.calendarService.calendar.subscribe(c => this.calendar = c);
    this.calendarService.errorMsg.subscribe(em => this.errorMsg = em);
  }

  getWeeks(): Array<CalendarDto[]> {
    const res = [];

    for(let i=0; i < this.calendar.length; i = i + this.WEEK_DAYS) {
      res.push(this.calendar.slice(i, i + this.WEEK_DAYS))
    }

    return res;
  }


}
