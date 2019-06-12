
import { Url } from '../../Url';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { UserData } from '../../tables/interfaces';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-deactivated-employees',
  templateUrl: './deactivated-employees.component.html',
  styleUrls: ['./deactivated-employees.component.scss']
})
export class DeactivatedEmployeesComponent implements OnInit {
  public displayedColumns = ['employeeCode', 'Name', 'email', 'designation', 'department', 'qrCode'];
  showNavListCode;
  ID: any;
  tableList = [];
  userId: number[] = [];
  searchTerm: string;
  userModel: any;
  isLoading=true;
  dataSource = new MatTableDataSource<Employeetable>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue: string;
  constructor(private http: HttpClient, public route: Router, private empService: EmployeesService) { }
  ngOnInit() {
    this.InActiveEmployeeList().then(data => {
      this.dataSource.data = data;
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // console.log(this.dataSource);
    // of(this.dataSource).pipe(delay(1000))
    // .subscribe(data => {
    //   this.isLoading = false;
    //   this.dataSource = data
    // }, error => this.isLoading = false);
  }
  InActiveEmployeeList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/employee/deactive/employees')
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
  employeeDetails(id: number) {
    // console.log(id);
    this.empService.setEmployeeId(id);
    this.route.navigateByUrl('auth/employees/employee-details');
  }
  downloadQR(id: string) {
    // console.log(id);
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/qrcode/qrCode/download/1')
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
export interface Employeetable {
  employeeCode: string;
  Name: string;
  email: string;
  designation: string;
  department: string;
  status: string;
}




