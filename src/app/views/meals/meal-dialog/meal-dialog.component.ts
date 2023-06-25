import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MealDto } from 'src/app/models/dtos/MealDto';

@Component({
  selector: 'meal-dialog',
  templateUrl: './meal-dialog.component.html',
  styleUrls: ['./meal-dialog.component.scss']
})
export class MealDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<MealDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public meal: MealDto,
  ) {
   
  }

}
