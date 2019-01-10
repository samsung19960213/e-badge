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
  selector: 'app-late-comers',
  templateUrl: './late-comers.component.html',
  styleUrls: ['./late-comers.component.scss']
})
export class LateComersComponent implements OnInit {

  public displayedColumns = ['Name', 'fromDate', 'toDate', 'reason', 'status' ];
  showNavListCode;
  ID: any;
  
  
  userId: number[]= [];
  searchTerm:string;
  date = new Date();
	selection = new SelectionModel<string>(true, []);
  dataSource = new MatTableDataSource<any>()


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
  constructor(private http: HttpClient, public route: Router, public leaveService: LeaveService, public datePipe: DatePipe) {}
  	ngOnInit() {
      let Datenow =this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.getData(Datenow);
    this.dataSource.paginator =this.paginator;
    }
    
    
    events: string[] = [];

    fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
      
      let fromDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
      this.getData(fromDate);
     
    }
    getData(fromDate:any, ){
      return new Promise((resolve, reject) => {
                this.http.get(Url.API_URL + 'api/attendance/lateentry/'+ fromDate )
                .subscribe((response: any) => {
                  this.dataSource = response;
                  console.log(this.dataSource);
                  resolve(response);
                },reject);
              
              });
    }
  


   
   
	}



