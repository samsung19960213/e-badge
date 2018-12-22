import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { id } from '@swimlane/ngx-charts/release/utils';
import { json } from 'd3';
import { Router } from '@angular/router';
import { EmployeesRouterModule } from '../employees.router';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeesService } from '../employees.service';


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {

	public displayedColumns = ['employeeCode','Name','email', 'designation', 'department', 'status' ];
  showNavListCode;
  ID: any;
  userId: number[]= [];
  searchTerm:string;
	selection = new SelectionModel<string>(true, []);
  dataSource = [];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
  constructor(private http: HttpClient, public route: Router, private empService: EmployeesService) {}
  	ngOnInit() {
    this.userSalaryList();
    this.dataSource;
    }

    userSalaryList(): Promise<any> {
      return new Promise((resolve, reject) => {

        this.http.get(Url.API_URL + 'api/employee/findall')
        .subscribe((response: any) => {
          this.dataSource = response;
          console.log(this.dataSource);
          resolve(response);
        },reject);
      
      });
    }
    isAllSelected(): boolean {
	    if (!this.dataSource) { return false; }
	    if (this.selection.isEmpty()) { return false; }

	    if (this.filter.nativeElement.value) {
       
        return this.selection.selected.length == this.dataSource.length;
     
	    } else {

        return this.selection.selected.length == this.dataSource.length;
        
      }
    }
    deactivateAll() {
      for( var id of this.userId) {
        this.deactivate(id);
       
      }
    }
    employeeDetails(id:number) {
      console.log(id);
    this.empService.setEmployeeId(id);
     this.route.navigateByUrl('auth/employees/employee-details');
    }
deactivate(id: number) {
 
//   return new Promise((resolve, reject) => {
//     this.http.post(Url.API_URL + 'api/employee/deactivate/'  )
//         .subscribe((response: any) => {
//             resolve(response);
//         }, reject);
// });
}

    selectAll() {
      if(this.isAllSelected()){
   
      console.log('selected');
      }
      else {
        console.log('not selected');
      }
    }
      masterToggle() {
        if (!this.dataSource) { return; }
  
        if (this.isAllSelected()) {
          this.selection.clear();
        } else if (this.filter.nativeElement.value) {
          this.dataSource.forEach(data => this.selection.select(data.id));
        } else {
          this.dataSource.forEach(data => this.selection.select(data.email));
        }
    }
    selectUser(id: number) {
      const realId = this.userId.indexOf(id);
      if(realId !== -1) {
        this.userId.splice(realId,1);
        console.log(this.userId);
      }
      else {
        this.userId.push(id);
        console.log(this.userId);
      }

    }
	}






