
import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { LeaveService } from '../../leaves/leaves.service';
import { Url } from '../../Url';
import { ReportsService } from '../reports.service';
import { ExcelService } from '../excel.service';
import { delay } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: { // Absent
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: { // Work from home
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: { // Leave
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: { // Present
    primary: '#006600',
    secondary: '#1aff1a'
  },
  white: { // Default
    primary: '#ffffff',
    secondary: '#f2f2f2'
  }
};


@Component({
  selector: 'app-personal-reports',
  templateUrl: './personal-reports.component.html',
  styleUrls: ['./personal-reports.component.scss']
})
export class PersonalReportsComponent implements OnInit {
  public displayedColumns = ['date', 'checkInTime', 'checkOutTime', 'workingHours'];
  showNavListCode;
  ID: number;
  // dataSource = ELEMENT_DAT
  searchTerm: string;
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth();
  isLoading = true;

  firstDay = new Date(this.year, this.month, 1);
  lastDay = new Date(this.year, this.month + 1, 0);
  startDate: string;
  endDate: string;
  selection = new SelectionModel<string>(true, []);
  dataSource: any;
  tableData: any[];
  Name: string;
  Lname: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue: string;

  constructor(private http: HttpClient,
    public excelSrv: ExcelService,
    public route: Router,
    public leaveService: LeaveService,
    public datePipe: DatePipe,
    public reportsService: ReportsService,
    private modal: NgbModal) { }

  ngOnInit() {
    this.Name = this.reportsService.name;
    this.Lname = this.reportsService.lname;
    this.ID = this.reportsService.getReportid();
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    this.dataSource = new MatTableDataSource<PersonalReport>()
    this.getData(fromDate, toDate).then(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    // of(this.dataSource).pipe(delay(2000))
    // .subscribe(data => {
    //   this.isLoading = false;
    //   this.dataSource = data
    // }, error => this.isLoading = false);
    
    
    // Loading data for default month
    this.monthChange();
  }


  // events: string[] = [];

  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {

    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    let fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.getData(fromDate, toDate).then(data => {
      this.dataSource.data = data;
    })

  }
  getData(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + "api/attendance/attendance/report/" + this.reportsService.reportid + "/" + fromDate + '/' + toDate)
        .subscribe((response: any) => {

          this.tableData = response;
          resolve(response);
        }, reject);
    });
  }

  getAttendanceDataForCalendar() {
    var startDate = this.datePipe.transform(new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1), 'yyyy-MM-dd');
    var endDate = this.datePipe.transform(new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0), 'yyyy-MM-dd');
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + "api/attendance/get-attendance-cal?employeeId=" + this.reportsService.reportid + "&startDate=" + startDate + '&endDate=' + endDate)
        .subscribe((response: any) => {
          this.tableData = response;
          resolve(response);
        }, reject);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  toDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.getData(fromDate, toDate).then(data => {
      this.dataSource.data = data;
    })
  }
  exportPersonalReport(): void {
    this.excelSrv.exportAsExcelFile(this.tableData, 'Personal-Report');
  }

  // Added data for calender try
  @ViewChild('modalContent', { read: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  monthChange() {
    this.events = [];
    this.getAttendanceDataForCalendar().then((resp: any) => {
      resp.forEach(item => {
        const event:CalendarEvent =
        {
          start: new Date(item.startDate),
          end: new Date(item.endDate),
          title: item.title,
          color: item.type == 'AT' ? colors.green : (item.type == 'LV' ? colors.yellow : (item.type == "WH" ? colors.blue : (item.type = "AB" ? colors.red : colors.white))),
          allDay: true
        }
        this.events.push(event);
      });
      this.refresh.next();
    })
  }

}

export interface PersonalReport {
  attendanceId: number;
  checkInTime: string;
  checkOutTime: string;
  date: string;
  employeeId: number;
  workingHours: string;
}








