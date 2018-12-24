import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { LeaveService } from '../leaves.service';


@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent implements OnInit {

  public displayedColumns = ['Name', 'fromDate', 'toDate', 'reason', 'status' ];
  showNavListCode;
  ID: any;
  userId: number[]= [];
  searchTerm:string;
	selection = new SelectionModel<string>(true, []);
  dataSource = new MatTableDataSource<any>()

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
  constructor(private http: HttpClient, public route: Router, public leaveService: LeaveService) {}
  	ngOnInit() {
    this.userSalaryList();

    this.dataSource.paginator =this.paginator;
    }

    userSalaryList(): Promise<any> {
      return new Promise((resolve, reject) => {

        this.http.get(Url.API_URL + 'api/leave/findall')
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



