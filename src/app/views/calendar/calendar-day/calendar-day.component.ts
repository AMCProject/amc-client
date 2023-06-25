import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDto } from 'src/app/models/dtos/CalendarDto';
import { MealDialogComponent } from '../../meals/meal-dialog/meal-dialog.component';
import { MealDto } from 'src/app/models/dtos/MealDto';
import { CalendarService } from 'src/app/services/calendars/calendar.service';
import { CalendarEditMealComponent } from '../calendar-edit-meal/calendar-edit-meal.component';
import { MealService } from 'src/app/services/meals/meal.service';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent {

  @Input() calendarDay: CalendarDto;

  isCurrentDay = false;
  isValidMeal = false;

  constructor(
    private calendarService: CalendarService,
    private mealService: MealService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.checkCurrentDate();
    this.checkValidMeal();
  }

  checkCurrentDate(): void {
    this.isCurrentDay = this.calendarService.currentDay == this.calendarDay.date;
  }

  checkValidMeal(): void {
    this.isValidMeal = this.calendarDay.meal_id != '';
  }

  openMeal() {
    if (this.isValidMeal) {
      const mealDto = new MealDto();
      mealDto.id = this.calendarDay.meal_id;
  
      this.mealService.getMeal(mealDto).subscribe(meal => {
        this.dialog.open(MealDialogComponent, { data: meal });
      })
    }


  }

  editMeal($event: Event) {
    $event.stopPropagation();

    this.dialog.open(CalendarEditMealComponent, { data: this.calendarDay });
  }

}
