import { Url } from '../../Url';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { EmployeesService } from '../../employees/employees.service';
import { UserService } from '../../user.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-checkout-request',
  templateUrl: './checkout-request.component.html',
  styleUrls: ['./checkout-request.component.scss']
})
export class CheckoutRequestComponent implements OnInit {

  public displayedColumns = ['firstName', 'date', 'checkInTime', 'designation', 'checkoutDate', 'checkOut', 'submit'];
  showNavListCode;
  ID: any;
  tableList = [];
  userId: number[] = [];
  searchTerm: string;
  userModel: any;
  attendanceId: number;
  checkOutTime: string;
  checkOutData: string;
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth();
  firstDay = new Date(this.year, 0, 1);
  lastDay = new Date();
  startDate: string;
  endDate: string;
  dataSource: any;
  roleId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue: string;
  constructor(private http: HttpClient, public route: Router, public userService: UserService, public datePipe: DatePipe, public snackBar: MatSnackBar) { }
  ngOnInit() {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    console.log(fromDate);
    this.checkOutList(fromDate, toDate).then(data => {
      this.dataSource = new MatTableDataSource<Employeetable>();
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    let fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    console.log(toDate);
    this.checkOutList(fromDate, toDate).then(data => {
      this.dataSource.data = data;
    })
  }
  checkOutList(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/attendance/unchecked/attendance/' + +this.userService.userId + '/' + fromDate + '/' + toDate)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  toDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.checkOutList(fromDate, toDate).then(data => {
      this.dataSource.data = data;
    })
  }
  firstDate(): Promise<any> {
    let latest_date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    return new Promise((resolve, reject) => {
      // 
      this.http.get(Url.API_URL + 'api/leave/request/' + latest_date)
        // this.http.get(Url.API_URL + 'api/leave/findall')
        .subscribe((response: any) => {
          this.dataSource = response;
          console.log(this.dataSource);
          resolve(response);
        }, reject);
    });
  }
  submitCheckout(id, value, time) {
    if (value != null && time != null) {
      this.checkOutTime = this.datePipe.transform(value, 'yyyy-MM-dd') + 'T' + time + ':00';
      this.attendanceId = id;
      this.checkOutTime = this.checkOutTime;
      var fromDate;
      var toDate;
      const checkoutDto = {
        'checkOutTime': this.checkOutTime,
        'attendanceId': this.attendanceId
      };
      return new Promise((resolve, error) => {
        this.http.post(Url.API_URL + 'api/attendance/save/checkouttime', checkoutDto)
          .subscribe((response: any) => {
            resolve(response);
            this.snackBar.open('Submitted Successfully', 'OK', {
              duration: 2000,
              verticalPosition: 'top',
            });
            let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
            let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
            this.checkOutList(fromDate, toDate).then(data => {
              this.dataSource = new MatTableDataSource<Employeetable>();
              this.dataSource.data = data;
            })
          }, (error: any) => {
            this.snackBar.open('Checkout time is less than CheckIn time', 'OK', {
              duration: 2000,
              verticalPosition: 'top',
            });
          });
      });
    }
    else {
      this.snackBar.open('Enter both Date And Time of Check-out', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
      });
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
export interface Employeetable {
  employeeCode: string;
  firstName: string;
  date: string;
  lastName: string;
  checkInTime: string;
  designation: string;
}





