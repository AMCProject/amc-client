import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MealDto } from 'src/app/models/dtos/MealDto';
import { MealService } from 'src/app/services/meals/meal.service';
import { MealDialogComponent } from '../meal-dialog/meal-dialog.component';
import { Types } from 'src/app/models/enums/types';
import { Seasons } from 'src/app/models/enums/seasons';
import { MealSelectIngredientsComponent } from '../meal-select-ingredients/meal-select-ingredients.component';

@Component({
  selector: 'meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent {
  mealForm: FormGroup;
  ingredients: Map<string, Map<string, number>>;
  errorMsg: string;
  isUpdate = false;

  types = Types;
  seasons = Seasons;
  
  constructor(
    public dialogRef: MatDialogRef<MealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public meal: MealDto,
    private mealsService: MealService,
    private dialog: MatDialog
  ) {
    this.mealsService.ingredients.subscribe(i => this.ingredients = i);
    this.isUpdate = meal ? true : false;

    this.mealForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description :new FormControl(''),
      image: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
      kcal: new FormControl(''),
      seasons: new FormControl('', [Validators.required]),
    })

    if (this.isUpdate) {
      this.mealForm.get('name').setValue(meal.name);
      this.mealForm.get('description').setValue(meal.description);
      this.mealForm.get('image').setValue(meal.image);
      this.mealForm.get('type').setValue(meal.type);
      this.mealForm.get('ingredients').setValue(meal.ingredients);
      this.mealForm.get('kcal').setValue(meal.kcal);
      this.mealForm.get('seasons').setValue(meal.seasons);
    }
  }

  saveMeal() {
    this.mealForm.markAllAsTouched();

    const newMeal = new MealDto();
    newMeal.name = this.mealForm.get("name").value;
    newMeal.description = this.mealForm.get("description").value;
    newMeal.image = this.mealForm.get("image").value;
    newMeal.type = this.mealForm.get("type").value;
    newMeal.ingredients = this.mealForm.get("ingredients").value;
    newMeal.kcal = 0;
    newMeal.seasons = this.mealForm.get("seasons").value;

    if (this.isUpdate) {
      newMeal.id = this.meal.id;
      newMeal.user_id = this.meal.user_id;

      this.mealsService.updateMeal(newMeal);
    } else {
      this.mealsService.createMeal(newMeal);
    }

    this.dialogRef.close();
  }

  selectIngredients() {
    this.dialog.open(MealSelectIngredientsComponent, { data: this.mealForm.get("ingredients").value })
    .afterClosed().subscribe(ingredients => {
      this.mealForm.get("ingredients").setValue(ingredients);
      this.mealForm.get('ingredients').markAsTouched();
    });
  }

}
