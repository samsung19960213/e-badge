import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { EmployeesService } from '../../employees/employees.service';
@Component({
  selector: 'app-checkout-request',
  templateUrl: './checkout-request.component.html',
  styleUrls: ['./checkout-request.component.scss']
})
export class CheckoutRequestComponent implements OnInit {

	public displayedColumns = ['employeeCode','Name','email', 'designation', 'department', 'status','qrCode' ];
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
    submitCheckout(id, value){
      console.log(id, value);
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }



   
	}
  export interface Employeetable {
    employeeCode:string;
    Name:string;
    email:string;
    designation:string;
    department:string; 
    status:string;
  }




