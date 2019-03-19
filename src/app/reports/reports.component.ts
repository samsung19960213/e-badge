
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { LeaveService } from '../leaves/leaves.service';
import { Url } from '../Url';
import { ReportsService } from './reports.service';
import { UserService } from '../user.service';
import { ExcelService } from './excel.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public displayedColumns = ['Edit','employeeCode', 'firstName', 'workingDays', 'workingHours', 'daysWorked', 'average'];
  showNavListCode;
  ID: any;
  avg = [];
  average = [];
  userId: number[] = [];
  searchTerm: string;
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth();
  firstDay = new Date(this.year, this.month, 1);
  lastDay = new Date(this.year, this.month + 1, 0);
  startDate: string;
  endDate: string;
  isLoading=true;
  selection = new SelectionModel<string>(true, []);
  dataSource: any;
  tableData: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private http: HttpClient,
    public excelSrv: ExcelService,
    public route: Router,
    public leaveService: LeaveService,
    public datePipe: DatePipe,
    public reportService: ReportsService,
    public userService: UserService) { }
  
    ngOnInit() {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    this.dataSource = new MatTableDataSource<PeriodicElement>()
    this.getData(fromDate, toDate).then(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.averageHours(this.dataSource.data.length);
    });
    of(this.dataSource).pipe(delay(2000))
    .subscribe(data => {
      this.isLoading = false;
      this.dataSource = data
    }, error => this.isLoading = false);
  }
  events: string[] = [];

  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    let fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.getData(fromDate, toDate).then(data => {
      this.dataSource.data = data;
      this.averageHours(this.dataSource.data.length);
    })
  }
  getData(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/attendance/mainattendance/report/' + fromDate + '/' + toDate + '/' + this.userService.EmployeeID)
        .subscribe((response: any) => {
          resolve(response);
          this.tableData = response;
        }, reject);
    });

  }
  toDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.getData(fromDate, toDate).then(data => {
      this.dataSource.data = data;
      this.averageHours(this.dataSource.data.length);
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  personalReport(id: number, name: string, lname: string) {
    this.reportService.setName(name);
    this.reportService.setLastName(lname);
    this.reportService.setReportid(id);
    this.route.navigateByUrl('auth/reports/personal');
  }
  edit(id: number, name: string, lname: string){
    this.reportService.setName(name);
    this.reportService.setLastName(lname);
    this.reportService.setReportid(id);
    this.route.navigateByUrl('auth/reports/personal');
  }
  averageHours(length: number) {
    this.average = [];
    for (var i = 0; i < length; i++) {
      var str = this.dataSource.data[i].workingHours;
      var splitted = str.split(":", 3);
      this.average.push(Math.round(+splitted[0] / this.dataSource.data[i].daysWorked * 10) / 10);
      this.dataSource.data[i].average = this.average[i];
    }
  }
  exportAsXLSX(): void {
     this.excelSrv.exportAsExcelFile(this.tableData, 'Attendence-Report');
  }
}
export interface PeriodicElement {

  daysWorked: number;
  employeeCode: string,
  employeeId: number;
  firstName: string;
  lastName: string;
  workingDays: number;
  workingHours: string;
  average: number;
}







