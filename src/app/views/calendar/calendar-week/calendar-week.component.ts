import { Component, Input } from '@angular/core';
import { CalendarDto } from 'src/app/models/dtos/CalendarDto';
import { CalendarService } from 'src/app/services/calendars/calendar.service';

@Component({
  selector: 'calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent {

  @Input() calendarDtos: CalendarDto[];
  @Input() index: number;

  isCurrentWeek = false;

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.checkCurrentWeek();
  }

  redoWeek(): void {
    this.calendarService.redoWeekCalendar(this.calendarDtos[0].date, this.calendarDtos[this.calendarDtos.length - 1].date);
  }

  checkCurrentWeek() {
    this.isCurrentWeek = this.calendarDtos.some(c => c.date == this.calendarService.currentDay);
  }

}
