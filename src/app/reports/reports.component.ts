
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


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public displayedColumns = ['employeeCode', 'firstName', 'workingDays', 'workingHours', 'daysWorked', 'average'];
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
  selection = new SelectionModel<string>(true, []);
  dataSource :any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private http: HttpClient, public route: Router, public leaveService: LeaveService, public datePipe: DatePipe, public reportService: ReportsService) { }
  ngOnInit() {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');

    this.getData(fromDate, toDate).then(data=>{
      this.dataSource = new MatTableDataSource<PeriodicElement>()
      this.dataSource.data=data;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator =this.paginator;
      this.averageHours(this.dataSource.data.length);
       
        
    })
   
    
   
  }


  events: string[] = [];

  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {

    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    let fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    console.log(toDate);
    this.getData(fromDate, toDate).then(data=>{
      this.dataSource.data=data;
      this.averageHours(this.dataSource.data.length);
    })

  }
  getData(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/attendance/mainattendance/report/' + fromDate + '/' + toDate)
        .subscribe((response: any) => {
         
         
          resolve(response);
        }, reject);
    });

  }
  toDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
 
    this.getData(fromDate, toDate).then(data=>{
      this.dataSource.data=data;
      this.averageHours(this.dataSource.data.length);
    })

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  personalReport(id: number, name:string, lname:string) {
    this.reportService.setName(name);
    this.reportService.setLastName(lname);
    this.reportService.setReportid(id);
    this.route.navigateByUrl('auth/reports/personal')
  }
  averageHours(length: number) {
    this.average=[];
    for (var i = 0; i < length; i++) {
      var str = this.dataSource.data[i].workingHours;
      var splitted = str.split(":", 3);
      console.log(splitted);
      this.average.push(Math.round(+splitted[0] / this.dataSource.data[i].daysWorked * 10) / 10);
      this.dataSource.data[i].average = this.average[i];
    }
    console.log(this.dataSource);

  }
  // leaveDetails(id:number) {
  //   console.log(id);
  // this.leaveService.setLeaveId(id);
  //  this.route.navigateByUrl('auth/leaves/leave-details');
  // }

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







