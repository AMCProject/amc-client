import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDto } from 'src/app/models/dtos/CalendarDto';
import { MealDialogComponent } from '../../meals/meal-dialog/meal-dialog.component';
import { MealDto } from 'src/app/models/dtos/MealDto';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent {

  constructor(private dialog: MatDialog) {}

  @Input() calendarDay: CalendarDto;

  openMeal() {

    const mealDto = new MealDto();
    mealDto.id = this.calendarDay.meal_id;
    mealDto.name = this.calendarDay.name;


    this.dialog.open(MealDialogComponent, { data: mealDto });
  }

  editMeal($event: Event) {
    $event.stopPropagation();
  }

}
