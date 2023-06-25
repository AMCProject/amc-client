import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealService } from 'src/app/services/meals/meal.service';
import { MealFormComponent } from '../meal-form/meal-form.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Types } from 'src/app/models/enums/types';
import { Seasons } from 'src/app/models/enums/seasons';

@Component({
  selector: 'meal-search',
  templateUrl: './meal-search.component.html',
  styleUrls: ['./meal-search.component.scss']
})
export class MealSearchComponent {

  @Output() searchFormEmitter = new EventEmitter<FormGroup>();

  searchForm: FormGroup;

  types = Types;

  seasons = Seasons;

  constructor(
    private mealsService: MealService,
    private dialog: MatDialog
  ) {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      seasons: new FormControl([]),
      kcal: new FormControl(false)
    })

    this.searchForm.valueChanges.subscribe(() => this.searchFormEmitter.emit(this.searchForm));
  }
  
  createMeal() {
    this.dialog.open(MealFormComponent, { data: null });
  }
}
