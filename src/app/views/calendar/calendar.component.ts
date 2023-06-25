import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarDto } from 'src/app/models/dtos/CalendarDto';
import { CalendarService } from 'src/app/services/calendars/calendar.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { PdfComponent } from './pdf/pdf.component';

@Component({
  selector: 'amc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  calendar: CalendarDto[];
  errorMsg: string;
  loading = false;

  private readonly WEEK_DAYS = 7;
  DAY_LABELS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(
    private calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.calendarService.calendar.subscribe(c => this.calendar = c);
    this.calendarService.loading.subscribe(loading => this.loading = loading);
    this.calendarService.errorMsg.subscribe(em => {
      this.errorMsg = em
      if (em && em.toString().includes("meal not found")) {
        this.snackBar.open(em, "OK");
      }
    });
  }

  ngOnInit() {
    this.calendarService.getCalendar();
  }

  ngOnDestroy() {
    this.calendarService.errorMsg.next(null);
  }

  getWeeks(): Array<CalendarDto[]> {
    const res = [];

    for(let i=0; i < this.calendar.length; i = i + this.WEEK_DAYS) {
      res.push(this.calendar.slice(i, i + this.WEEK_DAYS))
    }

    return res;
  }

  createCalendar(): void {
    this.calendarService.createCalendar();
  }

  redoAll(): void {
    this.calendarService.redoCalendar();
  }

  exportPdf() {
    this.dialog.open(PdfComponent, {data: this.calendar});
  }


}
