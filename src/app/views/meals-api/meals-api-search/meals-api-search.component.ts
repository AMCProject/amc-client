import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealService } from 'src/app/services/meals/meal.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Types } from 'src/app/models/enums/types';
import { Seasons } from 'src/app/models/enums/seasons';

@Component({
  selector: 'meals-api-search',
  templateUrl: './meals-api-search.component.html',
  styleUrls: ['./meals-api-search.component.scss']
})
export class MealsApiSearchComponent {

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
    })

  }

  search() {
    this.searchFormEmitter.emit(this.searchForm);
  }
  
}
