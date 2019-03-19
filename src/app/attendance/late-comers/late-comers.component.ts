import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {of,} from 'rxjs';
import {delay} from 'rxjs/operators';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { LeaveService } from '../../leaves/leaves.service';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-late-comers',
  templateUrl: './late-comers.component.html',
  styleUrls: ['./late-comers.component.scss']
})
export class LateComersComponent implements OnInit {

  public displayedColumns = ['employeeCode', 'Name', 'Date', 'Time' ];
  showNavListCode;
  ID: any;
  isLoading = true;
  time:any[]=[];
  empId:number;
  userId: number[]= [];
  searchTerm:string;
  date = new Date();
	selection = new SelectionModel<string>(true, []);
  dataSource :any;


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue:string;
  constructor(private http: HttpClient, public route: Router, public leaveService: LeaveService, public datePipe: DatePipe,public userService:UserService) {}
  	ngOnInit() {
      this.empId= this.userService.EmployeeID;
      this.dataSource = new MatTableDataSource<LateComersTable>()
      let Datenow =this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.getData(Datenow).then(data=> {
      for( var i=0;i<this.dataSource.length;i++){
        var splitted = this.dataSource.data[i].checkInTime.split("T", 2);
        this.dataSource.data[i].checkInTime= splitted[1]
        }
      this.dataSource.data =data;
      this.dataSource.sort =this.sort;
      this.dataSource.paginator =this.paginator;
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

      let fromDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
      this.getData(fromDate).then(data=>{
        this.dataSource.data=data;
      })
    }
    getData(fromDate:any ){
      return new Promise((resolve, reject) => {
                this.http.get(Url.API_URL + 'api/attendance/lateentry/' + this.empId +'/'+ fromDate  )
                .subscribe((response: any) => {
                  resolve(response);
                },reject);
              });
    }
	}
  export class LateComersTable {

    attendanceId: number;
    checkInTime: string;
    checkOutTime: string;
    date: string;
    designation: string;
    employeeCode: string;
    employeeId: number;
    employeeImage: string;
    firstName: string;
    leaveReason: string;
    qrData: string;
    secondName: string;
    seconds: number;
    workingHours: string;
  }
  

