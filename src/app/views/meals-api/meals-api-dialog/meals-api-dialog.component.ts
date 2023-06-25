import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MealDto } from 'src/app/models/dtos/MealDto';

@Component({
  selector: 'meals-api-dialog',
  templateUrl: './meals-api-dialog.component.html',
  styleUrls: ['./meals-api-dialog.component.scss']
})
export class MealsApiDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<MealsApiDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public meal: MealDto,
  ) {
   
  }

}
