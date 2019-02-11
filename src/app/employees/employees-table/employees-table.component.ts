import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { EmployeesService } from '../employees.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {fromEvent as observableFromEvent,} from 'rxjs';
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { ExampleDataSource } from '../../tables/filter-table/helpers.data';



@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {

	public displayedColumns = ['employeeCode','firstName','contactEmail', 'designationName', 'departmentName', 'status','qrCode' ];
  showNavListCode;
  ID: any;
  tableList=[];
  userId: number[]= [];
  searchTerm:string;
  userModel :any;

  dataSource = new MatTableDataSource<Employeetable>();


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue:string;
  constructor(private http: HttpClient, public route: Router, private empService: EmployeesService) {}
  	ngOnInit() {
      this.EmployeeList().then(data => {
        this.dataSource.data =data;
      })
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort =this.sort;
  
   
    console.log(this.dataSource);
    
    

  }
  
 
  
    EmployeeList(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + 'api/employee/findall')
        .subscribe((response: any) => {
          resolve(response);
        },reject);
       
      });
    }
  
  
    employeeDetails(id:number) {
      console.log(id);
    this.empService.setEmployeeId(id);
     this.route.navigateByUrl('auth/employees/employee-details');
    }
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }



    downloadQR(id:string){
      console.log(id);
      window.open(Url.API_URL + 'api/qrcode/qrCode/download/'+id,'_blank');
      // return new Promise((resolve, reject) => {
      //       this.http.get(Url.API_URL + 'api/qrcode/qrCode/download/'+ id)
      //           .subscribe((response: any) => {
      //             var newWindow = window.open(response);
      //               resolve(response);
      //           }, reject);
      //   });

    }
	}
  export interface Employeetable {
    employeeCode:string;
    firstName:string;
    contactEmail:string;
    designationName:string;
    departmentName:string; 
    status:string;
  }





