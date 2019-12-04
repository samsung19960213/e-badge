import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Url } from '../../Url';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { DatePipe } from '@angular/common';
import { LeaveService } from '../../leaves/leaves.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-immediate-work-from-home',
  templateUrl: './immediate-work-from-home.component.html',
  styleUrls: ['./immediate-work-from-home.component.scss']
})
export class ImmediateWorkFromHomeComponent implements OnInit {
  public displayedColumns = ['Edit','requestedUserCode','requestedUser','reportingManagerName', 'requestFromDate', 'requestToDate',  'status'];
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
  firstDay = new Date(this.year, 0, 1);
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
    
    this.dataSource = new MatTableDataSource<Employeetable>();
    this.workFromHomeList().then(data => {
      this.dataSource.data = data;
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    })
    
  }
  
  workFromHomeList() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + "api/attendance/pending/workfromhome/all/"+this.userService.EmployeeID )
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
  edit(id:number){
    this.leaveService.setWorkId(id);
    this.route.navigateByUrl('auth/attendance/work-from-home-details' );
  }
  workFromHomeDetails(id:number) {
    this.leaveService.setPrevPage("immediate/work-from-home")
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


