import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MealService } from 'src/app/services/meals/meal.service';
import { MealDialogComponent } from '../meal-dialog/meal-dialog.component';

class Ingredient {
  name: string
  kcal: number
  group: string
}

@Component({
  selector: 'meal-select-ingredients',
  templateUrl: './meal-select-ingredients.component.html',
  styleUrls: ['./meal-select-ingredients.component.scss']
})
export class MealSelectIngredientsComponent {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['select', 'name', 'kcal', 'group'];
    dataSource = new MatTableDataSource<Ingredient>([]);
    selection = new SelectionModel<Ingredient>(true, []);

    groups: string[] = [];
    groupSelected: string;
    filterByGroup = false;

    constructor(
      public dialogRef: MatDialogRef<MealDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public ingredients: string[],
      private mealService: MealService
  ) {
  }

  ngOnInit() {
    this.mealService.ingredients.subscribe(ingredients => {
      if (ingredients) {
        const data: Ingredient[] = [];

        for (let group of ingredients) {
          this.groups.push(group[0]);

          for (let ingredient of group[1]) {
            const i = new Ingredient();
            i.name = ingredient[0];
            i.kcal = ingredient[1];
            i.group = group[0];
            data.push(i);
          }
        }

        this.dataSource.data = data;
        this.selection.select(...this.dataSource.data.filter(i => this.ingredients.includes(i.name)))
      }
    });

  }

  ngOnDestroy() {
    this.dialogRef.close(this.selection.selected.map(s => s.name));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  save() {
    this.dialogRef.close(this.selection.selected.map(s => s.name));
  }

  changeGroupSelected($event) {
    const filterValue = $event ? $event.trim().toLowerCase() : "";
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeFilterType() {
    this.filterByGroup = !this.filterByGroup;

    this.dataSource.filter = "";

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

}
