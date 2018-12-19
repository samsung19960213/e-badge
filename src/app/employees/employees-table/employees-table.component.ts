import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {

	public displayedColumns = ['select','id', 'firstName', 'employeeCode', 'email', 'phone', 'age', ];
  showNavListCode;

	selection = new SelectionModel<string>(true, []);
  dataSource = [];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
  constructor(private http: HttpClient) {}
  	ngOnInit() {
    this.userSalaryList();
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
      masterToggle() {
        if (!this.dataSource) { return; }
  
        if (this.isAllSelected()) {
          this.selection.clear();
        } else if (this.filter.nativeElement.value) {
          this.dataSource.forEach(data => this.selection.select(data.id));
        } else {
          this.dataSource.forEach(data => this.selection.select(data.id));
        }
    }
	}






