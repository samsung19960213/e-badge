import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatDatepickerInputEvent, MatSnackBar, MatSort, MatPaginator } from '@angular/material';
import { Url } from '../../Url';
import { DatePipe } from '@angular/common';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from '../../leaves/leaves.service';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-work-from-home',
  templateUrl: './work-from-home.component.html',
  styleUrls: ['./work-from-home.component.scss']
})
export class WorkFromHomeComponent implements OnInit {

  public displayedColumns = [];
  showNavListCode;
  ID: any;
  tableList = [];
  userId: number[] = [];
  searchTerm: string;
  userModel: any;
  id: number;
  employeeCode:string;
  checkOutTime: string;
  checkOutData: string;
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth();
  firstDay = new Date(this.year,this.month , 1);
  lastDay = new Date(this.year, this.month + 1, 0);
  isLoading=true;
  startDate: string;
  endDate: string;
  dataSource: any;
  roleId: number;
  workFromArray:Array<any> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue: string;
  constructor(private http: HttpClient,
    public route: Router,
    public userService: UserService,
    public datePipe: DatePipe,
    public leaveService:LeaveService,
    public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.roleId=this.userService.userroleId;
   
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    this.dataSource = new MatTableDataSource<Employeetable>();
    if(this.roleId === 2){
      this.displayedColumns = ['requestDate', 'requestFromDate', 'requestToDate','approvedBy',  'status'];
      this.workFromHomeListForUser(fromDate, toDate).then(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      })
    }else{
      this.displayedColumns = ['Edit','requestedUserCode','requestedUser','reportingManagerName', 'requestFromDate', 'requestToDate',  'status'];

    this.workFromHomeList(fromDate, toDate).then(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    })
  }
  }
  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    let fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    if(this.roleId === 2){
      this.workFromHomeListForUser(fromDate, toDate).then(data => {
        this.dataSource.data = data;
      })
    }else{
    this.workFromHomeList(fromDate, toDate).then(data => {
      this.dataSource.data = data;
    })
  }
  }
  workFromHomeListForUser(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + "api/attendance/workfromhome/user?employeeId="+this.userService.EmployeeID + "&fromDate=" + fromDate + "&toDate=" + toDate)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  workFromHomeList(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + "api/attendance/workfromhome/all?employeeId="+this.userService.EmployeeID + "&fromDate=" + fromDate + "&toDate=" + toDate)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  toDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    if(this.roleId === 2){
      this.workFromHomeListForUser(fromDate, toDate).then(data => {
        this.dataSource.data = data;
      })
    }else{
    this.workFromHomeList(fromDate, toDate).then(data => {
      this.dataSource.data = data;
    })
  }
  }
  firstDate(): Promise<any> {
    let latest_date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leave/request/' + latest_date)
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
            this.workFromHomeList(fromDate, toDate).then(data => {
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
  edit(id:number){
    this.leaveService.setWorkId(id);
    this.route.navigateByUrl('auth/attendance/work-from-home-details' );
  }
  workFromHomeDetails(id:number) {
    this.leaveService.setPrevPage("work-from-home")
   this.leaveService.setWorkId(id);
  this.route.navigateByUrl('auth/attendance/work-from-home-details' );
  }
}
export interface Employeetable {
  employeeCode: string;
  firstName: string;
  date: string;
  status:string;
  comments:string;
  lastName: string;
  checkInTime: string;
  designation: string;
}






