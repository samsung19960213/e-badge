import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LeaveService } from '../../leaves/leaves.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../../user.service';
import { Url } from '../../Url';
import { MatDatepickerInputEvent, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-monthly-absentees-list',
  templateUrl: './monthly-absentees-list.component.html',
  styleUrls: ['./monthly-absentees-list.component.scss']
})
export class MonthlyAbsenteesListComponent implements OnInit {
  public displayedColumns = ['employeeCode', 'Name', 'Email', 'Department', 'Designation','absentCount'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue: string;
  constructor(public userService: UserService, private http: HttpClient, public route: Router, public leaveService: LeaveService, public datePipe: DatePipe) { }
  roleId: number;
  dateMon = [];
  dataSource: any;
  showNavListCode;
  ID: any;
  Datenow;
  time: any[] = [];
  userId: number[] = [];
  searchTerm: string;
  date = new Date();
  selection = new SelectionModel<string>(true, []);
  ngOnInit() {
    this.roleId = this.userService.EmployeeID;
    // this.dateMon = this.leaveService.name;
    // this.Datenow = this.dateMon.toString().substr(3, 4) + '-' + this.dateMon.toString().substr(0, 2)
    if( this.leaveService.name === ''){
    let selMonth = this.datePipe.transform(new Date(), 'yyyy-MM');
    this.leaveService.setDateMonth(selMonth);
    }
    this.Datenow = this.leaveService.name;

    this.dataSource = new MatTableDataSource<MonthlyAbsenteesList>();
    this.getData().then(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  getData() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/attendance/getabsentees/per/month/' + this.Datenow + '/' + this.roleId)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  events: string[] = [];
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.getData().then(data => {
      this.dataSource.data = data;
    })
  }
}

export class MonthlyAbsenteesList {
  employeeCode: string;
  firstName: string;
  lastName: string;
  contactEmail: string;
  designationName: string;
  departmentName: string;

}