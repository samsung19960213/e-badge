import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { DatePipe } from '@angular/common';
import { LeaveService } from '../../leaves/leaves.service';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Employeetable } from '../../employees/employees-table/employees-table.component';

@Component({
  selector: 'app-work-from-home-emp-list',
  templateUrl: './work-from-home-emp-list.component.html',
  styleUrls: ['./work-from-home-emp-list.component.scss']
})
export class WorkFromHomeEmpListComponent implements OnInit {
  public displayedColumns = ['requestedUserCode','requestedUser','reportingManagerName','designationName','departmentName'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  constructor(private http: HttpClient,
    public route: Router,
    public userService: UserService,
    public datePipe: DatePipe,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Employeetable>();
    this.workFromHomeList().then(data => {
      this.dataSource.data = data;
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
       console.log(this.dataSource);
    })
  }


  workFromHomeList() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + "/api/employee/workfromhome/list/"+this.userService.EmployeeID )
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
}
