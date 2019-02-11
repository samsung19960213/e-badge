import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { LeaveService } from '../../leaves/leaves.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-leave-reports',
  templateUrl: './leave-reports.component.html',
  styleUrls: ['./leave-reports.component.scss']
})
export class LeaveReportsComponent implements OnInit {

  public displayedColumns = ['Name', 'fromDate', 'toDate', 'reason', 'status' ];
  showNavListCode;
  ID: any;
  
  
  userId: number[]= [];
  searchTerm:string;
  date = new Date();
    year = this.date.getFullYear();
    month = this.date.getMonth();
    
    firstDay = new Date(this.year, 0, 1);
    lastDay = new Date();
    startDate:string;
    endDate:string;
    
	selection = new SelectionModel<string>(true, []);
dataSource:any;


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue:string;
  constructor(private http: HttpClient, public route: Router, public leaveService: LeaveService, public datePipe: DatePipe, public userService: UserService) {}
  	ngOnInit() {
      let fromDate =this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
      let toDate =this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
      console.log(fromDate);
  
      this.getData(fromDate, toDate).then(data => {
        this.dataSource = new MatTableDataSource<LeaveListTable>();
        this.dataSource.data=data;
        this.dataSource.sort =this.sort;
    
        this.dataSource.paginator =this.paginator;
      })
     
    
    }
    
    
    events: string[] = [];
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
      
      let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
      let fromDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
      console.log(toDate);
      this.getData(fromDate,toDate).then(data=>{
        this.dataSource.data=data;
      })
     
     
    }
    getData(fromDate:any, toDate:any){
      return new Promise((resolve, reject) => {
                this.http.get(Url.API_URL + 'api/leave/request/'+ fromDate +'/'+toDate+'/'+this.userService.userroleId)
                .subscribe((response: any) => {
                 
                  resolve(response);
                },reject);
              
              });
    }
    toDate(type: string, event: MatDatepickerInputEvent<Date>) {
      let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
      let toDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
      console.log(toDate);
      this.getData(fromDate,toDate).then(data=>{
        this.dataSource.data=data;
      })
     
    
    }
    firstDate(): Promise<any> {
      let latest_date =this.datePipe.transform(this.date, 'yyyy-MM-dd');
      return new Promise((resolve, reject) => {
// 
        this.http.get(Url.API_URL + 'api/leave/request/'+ latest_date)
        
        // this.http.get(Url.API_URL + 'api/leave/findall')
        .subscribe((response: any) => {
          this.dataSource = response;
          console.log(this.dataSource);
          resolve(response);
        },reject);
      
      });
    }
   
    leaveDetails(id:number) {
      console.log(id);
    this.leaveService.setLeaveId(id);
     this.route.navigateByUrl('auth/leaves/leave-details');
    }
  
	}


export class LeaveListTable {

  userName:string;
  fromDate:string;
  toDate:string;
reason:string; 
  status:string;
}