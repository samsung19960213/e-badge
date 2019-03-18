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
import {fromEvent as observableFromEvent,} from 'rxjs';
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { ExampleDataSource } from '../../tables/filter-table/helpers.data';
import { EmployeesService } from '../../employees/employees.service';
import { LeaveService } from '../leaves.service';
import { UserService } from '../../user.service';



@Component({
  selector: 'app-pending-leaves',
  templateUrl: './pending-leaves.component.html',
  styleUrls: ['./pending-leaves.component.scss']
})
export class PendingLeavesComponent implements OnInit {

	public displayedColumns = ['Name','fromDate','toDate', 'requestDate','status' ];
  showNavListCode;
  ID: any;
  tableList=[];
  userId: number[]= [];
  searchTerm:string;
  userModel :any;
roleId:number;
  dataSource = new MatTableDataSource<Leavetable>();


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue:string;
  constructor(private http: HttpClient, public route: Router, private leaveService: LeaveService,public userService: UserService) {}
  	ngOnInit() {
      this.roleId= this.userService.userId;
      this.LeaveList().then(data => {
        this.dataSource.data =data;
      })
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort =this.sort;
  } 
    LeaveList(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + 'api/leave/leaverequestlist'+'/'+this.roleId)
        .subscribe((response: any) => {
          resolve(response);
        },reject);
       
      });
    }
    leaveDetails(id:number) {
      console.log(id);
    this.leaveService.setLeaveId(id);
     this.route.navigateByUrl('auth/leaves/leave-details');
    }
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }




	}
  export interface Leavetable {
    id: number,
    fromDate: string,
    toDate: string,
    reason: string,
    status: string,
    description: string,
    leaveType: string,
    userName: string,
    requestTime: string,
    availableLeaves: number
  }
  





