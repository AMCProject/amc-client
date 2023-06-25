import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarDto } from 'src/app/models/dtos/CalendarDto';
import { CalendarService } from 'src/app/services/calendars/calendar.service';
import { MealService } from 'src/app/services/meals/meal.service';
import { MealDialogComponent } from '../../meals/meal-dialog/meal-dialog.component';
import { MealDto } from 'src/app/models/dtos/MealDto';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {
  @ViewChild('pdf', {static: false}) pdf!: ElementRef;

  calendar: CalendarDto[];
  meals: MealDto[];

  constructor(
    public dialogRef: MatDialogRef<MealDialogComponent>,
    private mealService: MealService,
    private calendarService: CalendarService
) {
}

ngOnInit() {
  this.calendarService.calendar.subscribe(calendar => this.calendar = calendar)
  this.mealService.meals.subscribe(meals => this.meals = meals)
}


  getMealById(id: string): MealDto {
    return this.meals.find(m => m.id == id);
  }

  exportPdf()
  {
    const DATA = this.pdf.nativeElement;
    const doc: jsPDF = new jsPDF("p", "mm", "a4");
    doc.setFontSize(5)
    doc.html(DATA, {
      callback: (doc) => {
        doc.output("dataurlnewwindow");
      },
      margin: [0, 0, 0, 0],
      x: 10,
      y: 10,
      html2canvas: {
        scale: 0.3,
        width: 1000
      },
     });
  }

}
