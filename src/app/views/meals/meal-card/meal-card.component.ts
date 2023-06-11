import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealDto } from 'src/app/models/dtos/MealDto';
import { MealDialogComponent } from '../meal-dialog/meal-dialog.component';

@Component({
  selector: 'meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent {

  constructor(private dialog: MatDialog) {}

  @Input()
  meal: MealDto

  openMeal() {
    this.dialog.open(MealDialogComponent, { data: this.meal })
  }

  deleteMeal() {

  }
}
