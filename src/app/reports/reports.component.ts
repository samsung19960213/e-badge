import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Url } from '../Url';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public displayedColumns = ['employeeCode','Name','email', 'Checkin','Checkout', 'WorkingHours' ];
  showNavListCode;
  ID: any;
  tableList=[];
  userId: number[]= [];
  searchTerm:string;
  userModel :any;

  dataSource = new MatTableDataSource<Reporttable>();


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue:string;
  constructor(private http: HttpClient, public route: Router) {}
  	ngOnInit() {
      this.ReportList().then(data => {
        this.dataSource.data =data;
      })
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort =this.sort;
  
   
    console.log(this.dataSource);
    
    

  }
  ReportList(): any {
    throw new Error("Method not implemented.");
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  
    // ActiveEmployeeList(): Promise<any> {
    //   return new Promise((resolve, reject) => {
    //     this.http.get(Url.API_URL + 'api/employee/active')
    //     .subscribe((response: any) => {
    //       resolve(response);
    //     },reject);
       
    //   });
    // }
  
  
    // employeeDetails(id:number) {
    //   console.log(id);
    // this.empService.setEmployeeId(id);
    //  this.route.navigateByUrl('auth/employees/employee-details');
    // }




    // downloadQR(id:string){
    //   console.log(id);
    //   return new Promise((resolve, reject) => {
    //         this.http.get(Url.API_URL + 'api/qrcode/qrCode/download/1')
    //             .subscribe((response: any) => {
    //                 resolve(response);
    //             }, reject);
    //     });

    // }
	}
  export interface Reporttable {
    employeeCode:string;
    Name:string;
    email:string;
    checkin:string;
    checkout:string; 
    status:string;
  }





