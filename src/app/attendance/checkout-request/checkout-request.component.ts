import { Url } from '../../Url';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { UserService } from '../../user.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-checkout-request',
  templateUrl: './checkout-request.component.html',
  styleUrls: ['./checkout-request.component.scss']
})
export class CheckoutRequestComponent implements OnInit {

  public displayedColumns = [];
  showNavListCode;
  ID: any;
  tableList = [];
  userId: number[] = [];
  searchTerm: string;
  userModel: any;
  isLoading = true;
  id: number;
  private HolidayArray: Array<any> = [];
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
  checkOutRequestArray: Array<any> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue: string;
  constructor(private spinner:NgxSpinnerService,private http: HttpClient, public route: Router, public userService: UserService, public datePipe: DatePipe, public snackBar: MatSnackBar) { }
  ngOnInit() {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    this.dataSource = new MatTableDataSource<Employeetable>();
    this.roleId=this.userService.userroleId;
    if(this.roleId ===2){
      this.displayedColumns = [ 'date', 'checkInTime','requestedcheckOutTime', 'checkoutDate', 'checkOut', 'submit'];
      this.checkOutListOfUser(fromDate, toDate).then(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    }else{
      this.displayedColumns = ['firstName', 'date', 'checkInTime', 'designation','reportingManagerName', 'checkoutDate', 'checkOut', 'submit'];
    
    this.checkOutList(fromDate, toDate).then(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  }

  checkOutListOfUser(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/attendance/unchecked/attendance/' + +this.userService.userId + '/' + fromDate + '/' + toDate)
        .subscribe((response: any) => {
          resolve(response);


        }, reject);
    });
  }



  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    let fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.checkOutList(fromDate, toDate).then(data => {
      this.dataSource.data = data;
    })
  }
  checkOutList(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/attendance/unchecked/attendanceForAdmin/' + +this.userService.userId + '/' + fromDate + '/' + toDate)
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
          resolve(response);
        }, reject);
    });
  }
  submitCheckout(id, value, time) {
    if (value != null && time != null) {
      this.checkOutTime = this.datePipe.transform(value, 'yyyy-MM-dd') + 'T' + time + ':00';
      this.id = id;
      this.checkOutTime = this.checkOutTime;
      var fromDate;
      var toDate;
      const checkoutDto = {
        'checkOutTime': this.checkOutTime,
        'id': this.id
      };
      this.spinner.show();
      return new Promise((resolve, error) => {
        this.http.post(Url.API_URL + 'api/attendance/save/checkouttime', checkoutDto)
          .subscribe((response: any) => {
            resolve(response);
            this.spinner.hide();

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
            this.spinner.hide();

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


  submitCheckoutByUser(id, value, time) {
    if (value != null && time != null) {
      this.checkOutTime = this.datePipe.transform(value, 'yyyy-MM-dd') + 'T' + time + ':00';
      this.id = id;
      this.checkOutTime = this.checkOutTime;
      this.spinner.show();

      return new Promise((resolve, error) => {
        this.http.get(Url.API_URL + 'api/attendance/check-out?requestId='+this.id+'&checkOutTime='+this.checkOutTime)
          .subscribe((response: any) => {
            resolve(response);
            this.spinner.hide();

            this.snackBar.open('Submitted Successfully', 'OK', {
              duration: 2000,
              verticalPosition: 'top',
            });
            let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
            let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
            this.checkOutListOfUser(fromDate, toDate).then(data => {
              this.dataSource = new MatTableDataSource<Employeetable>();
              this.dataSource.data = data;
            })
          }, (error: any) => {
            this.spinner.hide();

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





