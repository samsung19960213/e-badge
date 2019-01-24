
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { LeaveService } from '../../leaves/leaves.service';
import { Url } from '../../Url';
import { ReportsService } from '../reports.service';


@Component({
  selector: 'app-personal-reports',
  templateUrl: './personal-reports.component.html',
  styleUrls: ['./personal-reports.component.scss']
})
export class PersonalReportsComponent implements OnInit {
  public displayedColumns = ['EmployeeCode', 'Name', 'WorkingHours', 'WorkingDays'];
  showNavListCode;
  ID:number;
  // dataSource = ELEMENT_DAT
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
Name:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue:string;
  constructor(private http: HttpClient, public route: Router, public leaveService: LeaveService, public datePipe: DatePipe, public reportsService: ReportsService) { }
  ngOnInit() {
    this.Name=this.reportsService.name;
    this.ID= this.reportsService.getReportid();
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    this.dataSource = new MatTableDataSource<PersonalReport>()
    this.getData(fromDate, toDate).then(data=>{
      this.dataSource.data =data;
      this.dataSource.paginator =this.paginator;
    })
    // this.dataSource.paginator =this.paginator;
  }


  events: string[] = [];

  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {

    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    let fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    console.log(toDate);
    this.getData(fromDate, toDate).then(data=>{
      this.dataSource.data=data;
    })

  }
  getData(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + "api/attendance/attendance/report/" + this.reportsService.reportid + "/" + fromDate + '/' + toDate)
        .subscribe((response: any) => {
          
       
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
    console.log(toDate);
    this.getData(fromDate, toDate).then(data=>{
      this.dataSource.data=data;
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







