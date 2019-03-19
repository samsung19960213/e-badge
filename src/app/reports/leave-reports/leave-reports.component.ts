import { Url } from '../../Url';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LeaveService } from '../../leaves/leaves.service';
import { UserService } from '../../user.service';
import { ExcelService } from '../excel.service';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-leave-reports',
  templateUrl: './leave-reports.component.html',
  styleUrls: ['./leave-reports.component.scss']
})
export class LeaveReportsComponent implements OnInit {

  public displayedColumns = ['EmployeeCode', 'Name', 'leaveDays', 'unInformedLeaves', 'remainingLeaves', 'pendingLeaves', 'acceptedLeaves', 'rejectedLeaves',];
  showNavListCode;
  ID: any;
  userId: number[] = [];
  searchTerm: string;
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth();
  firstDay = new Date(this.year, 0, 1);
  lastDay = new Date();
  startDate: string;
  endDate: string;
  isLoading=true;
  selection = new SelectionModel<string>(true, []);
  dataSource: any;
  tableData: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue: string;
  constructor(private http: HttpClient,
    public excelSrv: ExcelService,
    public route: Router,
    public leaveService: LeaveService,
    public datePipe: DatePipe,
    public userService: UserService) { }
  ngOnInit() {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    this.dataSource = new MatTableDataSource<LeaveListTable>();
    this.getData(fromDate, toDate).then(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;

      this.dataSource.paginator = this.paginator;
    })
    of(this.dataSource).pipe(delay(2000))
    .subscribe(data => {
      this.isLoading = false;
      this.dataSource = data
    }, error => this.isLoading = false);
  }
  events: string[] = [];
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {

    let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
    let fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.getData(fromDate, toDate).then(data => {
      this.dataSource.data = data;
    })
  }
  getData(fromDate: any, toDate: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leave/leave/report/' + this.userService.userId + '/' + fromDate + '/' + toDate)
        .subscribe((response: any) => {
          this.tableData = response;
          resolve(response);
        }, reject);
    });
  }
  toDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.getData(fromDate, toDate).then(data => {
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

  leaveDetails(id: number) {
    this.leaveService.setLeaveId(id);
    this.route.navigateByUrl('auth/leaves/leave-details');
  }
  exportLeaveReport(): void {
    this.excelSrv.exportAsExcelFile(this.tableData, 'Leave-Report');
  }

}


export class LeaveListTable {


  employeeCode: string;
  leaveDays: number;
  unInformedLeaves: number;
  remainingLeaves: number;
  acceptedLeaves: number;
  pendingLeaves: number;
  rejectedLeaves: number;
  firstName: string;
  lastName: string
}
