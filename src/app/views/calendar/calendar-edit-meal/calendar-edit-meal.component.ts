import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MealDto } from 'src/app/models/dtos/MealDto';
import { MealDialogComponent } from '../../meals/meal-dialog/meal-dialog.component';
import { MealService } from 'src/app/services/meals/meal.service';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CalendarService } from 'src/app/services/calendars/calendar.service';
import { Subscription } from 'rxjs';
import { CalendarDto } from 'src/app/models/dtos/CalendarDto';

@Component({
  selector: 'calendar-edit-meal',
  templateUrl: './calendar-edit-meal.component.html',
  styleUrls: ['./calendar-edit-meal.component.scss']
})
export class CalendarEditMealComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['select', 'name', 'seasons'];
  dataSource = new MatTableDataSource<MealDto>([]);
  selection = new SelectionModel<MealDto>(false, []);

  mealsSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<MealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public meal: CalendarDto,
    private mealService: MealService,
    private calendarService: CalendarService
) {
}

ngOnInit() {
  this.mealsSubscription = this.mealService.meals.subscribe(meals => {
    console.log(meals);
    
    if (meals) {
      this.dataSource.data = meals;
      this.selection.select(this.dataSource.data.find(m => m.id === this.meal.meal_id))
    }
  });

}

ngOnDestroy() {
  this.mealsSubscription.unsubscribe();
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

save() {
  this.meal.name = this.selection.selected[0].name;
  this.meal.meal_id = this.selection.selected[0].id;
  this.calendarService.updateCalendar(this.meal);
  this.dialogRef.close();
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
