import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { LeaveService } from '../../leaves/leaves.service';


@Component({
  selector: 'app-absentees',
  templateUrl: './absentees.component.html',
  styleUrls: ['./absentees.component.scss']
})
export class AbsenteesComponent implements OnInit {

  public displayedColumns = ['Name', 'fromDate', 'toDate', 'reason', 'status' ];
  showNavListCode;
  ID: any;
  date= new Date(); 
  from: Date = new Date();
  to: Date = new Date();
  userId: number[]= [];
  searchTerm:string;
	selection = new SelectionModel<string>(true, []);
  dataSource = new MatTableDataSource<any>()

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
  constructor(private http: HttpClient, public route: Router, public leaveService: LeaveService, public datePipe: DatePipe) {}
  	ngOnInit() {
    this.firstDate().then(data => {
      this.dataSource.data =data;
    })
    this.dataSource.paginator =this.paginator;
    }
    events: string[] = [];

    fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
      
      let latest_date =this.datePipe.transform(event.value, 'dd-MMM-yyyy');
      console.log(latest_date);
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
    firstDate(): Promise<any> {
      let latest_date =this.datePipe.transform(this.date, 'dd-MMM-yyyy');
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



