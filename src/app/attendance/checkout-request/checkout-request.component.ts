import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { EmployeesService } from '../../employees/employees.service';
import { UserService } from '../../user.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-checkout-request',
  templateUrl: './checkout-request.component.html',
  styleUrls: ['./checkout-request.component.scss']
})
export class CheckoutRequestComponent implements OnInit {

	public displayedColumns = ['firstName','date','checkInTime','designation','checkoutDate','checkOut','submit' ];
  showNavListCode;
  ID: any;
  tableList=[];
  userId: number[]= [];
  searchTerm:string;
  userModel :any;
  attendanceId: number;
checkOutTime:string;
checkOutData:string;
  dataSource = new MatTableDataSource<Employeetable>();
checkout:{
  attendanceId:string;
  checkOutTime:string;
 
}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue:string;
  constructor(private http: HttpClient, public route: Router, public userService: UserService, public datePipe: DatePipe, public snackBar: MatSnackBar) {}
  	ngOnInit() {
      this.checkOutList().then(data => {
        this.dataSource.data =data;
      })
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort =this.sort;
    console.log(this.dataSource);
  }
  
 
  
    checkOutList(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + 'api/attendance/unchecked/attendance/'+this.userService.userId)
        .subscribe((response: any) => {
          resolve(response);
          console.log('refreshed');
        },reject);
       
      });
    }
    submitCheckout(id, value, time){
      if(value!=null && time!= null){
  this.checkOutTime = this.datePipe.transform(value, 'yyyy-MM-dd') + 'T'+time+':00';
 this.checkout.attendanceId=id;
 this.checkout.checkOutTime=this.checkOutTime;
 console.log(this.checkout);

  return new Promise((resolve, error) => {
    this.http.post(Url.API_URL + 'api/attendance/save/checkouttime', this.checkout)
        .subscribe((response: any) => {
            resolve(response);
           
            console.log(id,this.checkout);
  this.snackBar.open('Submitted Successfully', 'OK', {
    duration: 2000,
    verticalPosition: 'top',
  });      
  this.checkOutList().then(data => {
    this.dataSource.data =data;
  })
           
          
        }, (error:any) => { 
          this.snackBar.open('Username / Password is incorrect', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
         }  );
});



  
 
}
else{
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
    employeeCode:string;
    firstName:string;
    date:string;
    lastName:string;
    checkInTime:string;
    designation:string;
   
  }





