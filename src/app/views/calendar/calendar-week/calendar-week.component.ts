import { Component, Input } from '@angular/core';
import { CalendarDto } from 'src/app/models/dtos/CalendarDto';

@Component({
  selector: 'calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent {

  @Input()
  calendarDtos: CalendarDto[];

}
