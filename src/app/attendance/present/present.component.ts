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
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss']
})
export class PresentComponent implements OnInit {

 
  public displayedColumns = ['employeeCode', 'Name', 'Department','Shift', 'Time' ];
  showNavListCode;
  ID: any;
  time:any[]=[];
  
  userId: number[]= [];
  searchTerm:string;
  date = new Date();
	selection = new SelectionModel<string>(true, []);
  dataSource :any;


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue:string;
  constructor(private http: HttpClient, public route: Router, public leaveService: LeaveService, public datePipe: DatePipe) {}
  	ngOnInit() {
      this.dataSource = new MatTableDataSource<LateComersTable>()
      let Datenow =this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.getData(Datenow).then(data=> {
      for( var i=0;i<this.dataSource.length;i++){
        var splitted = this.dataSource.data[i].checkInTime.split("T", 2);
        
        this.dataSource.data[i].checkInTime= splitted[1]
         
        }
      this.dataSource.data =data;
      
     
        console.log(this.dataSource)
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
      
      
      let fromDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
  
      this.getData(fromDate).then(data=>{
        this.dataSource.data=data;
      })
      
     
    }
    getData(fromDate:any ){
      return new Promise((resolve, reject) => {
                this.http.get(Url.API_URL + 'api/attendance/findall/byGivenDate/'+ fromDate )
                .subscribe((response: any) => {
                 console.log(response);
                  

                  resolve(response);
                },reject);
              
              });
    }
  


   
   
	}


  export class LateComersTable {

    checkInTime: string;
    department: string;
    employeeCode: string;
    employeeId: number;
    firstName: string;
    secondName: string;
    shiftName: string;
  
  }
  

