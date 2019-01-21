
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { LeaveService } from '../leaves/leaves.service';
import { Url } from '../Url';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
 
  public displayedColumns = ['EmployeeCode','Name', 'WorkingHours','WorkingDays',  'DayWorked', 'Average'];
  showNavListCode;
  ID: any;
  avg=[]
  dataSource = ELEMENT_DATA;
  average=[];
 
  userId: number[]= [];
  searchTerm:string;
  date = new Date();
    year = this.date.getFullYear();
    month = this.date.getMonth();
    
    firstDay = new Date(this.year, this.month, 1);
    lastDay = new Date(this.year, this.month + 1, 0);
    startDate:string;
    endDate:string;
    selection = new SelectionModel<string>(true, []);
  // dataSource = new MatTableDataSource<any>()


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  
  constructor(private http: HttpClient, public route: Router, public leaveService: LeaveService, public datePipe: DatePipe) {}
  	ngOnInit() {
      let fromDate =this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
      let toDate =this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
  this.averageHours()
    // this.getData(fromDate, toDate);
    // this.dataSource.paginator =this.paginator;
    }
    
    
    events: string[] = [];

    fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
      
      let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
      let fromDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
      console.log(toDate);
      // this.getData(fromDate,toDate);
     
    }
    // getData(fromDate:any, toDate:any){
    //   return new Promise((resolve, reject) => {
    //             this.http.get(Url.API_URL + 'api/attendance/attendance/report/'+ fromDate +'/'+toDate)
    //             .subscribe((response: any) => {
    //             this.dataSource= response;
    //               console.log(response);
    //               resolve(response);
    //             },reject);
    //       });
    // }
    toDate(type: string, event: MatDatepickerInputEvent<Date>) {
      let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
      let toDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
      console.log(toDate);
      // this.getData(fromDate,toDate);
     }
   personalReport(id:number) {
console.log(id);
this.route.navigateByUrl('auth/reports/personal')
   }
   averageHours() {
    length=this.dataSource.length;
    for(var i=0; i< length; i++){
                var str = this.dataSource[i].WorkingHours; 
                var splitted = str.split(":", 3); 
               

                this.average.push(+splitted[0]/this.dataSource[i].DayWorked);
                this.dataSource[i].Average=this.average[i];
                }
                console.log(this.average);

   }
    // leaveDetails(id:number) {
    //   console.log(id);
    // this.leaveService.setLeaveId(id);
    //  this.route.navigateByUrl('auth/leaves/leave-details');
    // }
  
	}
  export interface PeriodicElement {
    employeeid: string;
    employeeName:string;
    WorkingDays: number;
    WorkingHours: string;
    DayWorked: number;
    Average:number;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    { employeeid: 'MSS001', employeeName: 'Abul Hasan', WorkingDays: 2,WorkingHours:'15:00:00', DayWorked: 2, Average:0  },
    { employeeid: 'MSS002', employeeName: 'Shashi ', WorkingDays: 2, WorkingHours:'16:00:00', DayWorked: 2 ,Average:0},
    { employeeid: 'MSS003', employeeName: 'Shabir', WorkingDays: 2, WorkingHours:'10:00:00', DayWorked: 2 ,Average:0},
    { employeeid: 'MSS004', employeeName: 'Sadiya', WorkingDays: 2,WorkingHours:'14:00:00', DayWorked: 2  ,Average:0},
    { employeeid: 'MSS005', employeeName: 'Irakkini', WorkingDays: 2,WorkingHours:'16:00:00', DayWorked: 2 ,Average:0},
    { employeeid: 'MSS006', employeeName: 'Aravind', WorkingDays: 2,  WorkingHours:'19:00:00', DayWorked: 1,Average:0},
    { employeeid: 'MSS007', employeeName: 'Aaqil', WorkingDays: 2,WorkingHours:'12:00:00', DayWorked: 2 ,Average:0},
    { employeeid: 'MSS008', employeeName: 'Fawaz', WorkingDays: 2, WorkingHours:'15:00:00', DayWorked: 2,Average:0},
    { employeeid: 'MSS009', employeeName: 'Muthu ', WorkingDays: 2,  WorkingHours:'17:00:00', DayWorked: 2,Average:0},
    { employeeid: 'MSS010', employeeName: 'Mohan', WorkingDays: 2,  WorkingHours:'16:00:00', DayWorked: 2,Average:0},
  ];






