
import { Url } from '../../Url';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { UserData } from '../../tables/interfaces';


@Component({
  selector: 'app-active-employees',
  templateUrl: './active-employees.component.html',
  styleUrls: ['./active-employees.component.scss']
})
export class ActiveEmployeesComponent implements OnInit {

	public displayedColumns = ['employeeCode','Name','email', 'designation', 'department','qrCode' ];
  showNavListCode;
  ID: any;
  tableList=[];
  userId: number[]= [];
  searchTerm:string;
  userModel :any;

  dataSource = new MatTableDataSource<Employeetable>();


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  filterValue:string;
  constructor(private http: HttpClient, public route: Router, private empService: EmployeesService) {}
  	ngOnInit() {
      this.ActiveEmployeeList().then(data => {
        this.dataSource.data =data;
      })
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort =this.sort;
  
   
    console.log(this.dataSource);
    
    

  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  
    ActiveEmployeeList(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + 'api/employee/active')
        .subscribe((response: any) => {
          resolve(response);
        },reject);
       
      });
    }
  
  
    employeeDetails(id:number) {
      console.log(id);
    this.empService.setEmployeeId(id);
     this.route.navigateByUrl('auth/employees/employee-details');
    }




    downloadQR(id:string){
      console.log(id);
      return new Promise((resolve, reject) => {
            this.http.get(Url.API_URL + 'api/qrcode/qrCode/download/'+id)
                .subscribe((response: any) => {
                  let resp = URL.createObjectURL(response)
                  window.open(resp);
                  resolve(response);
                   
                }, reject);
        });

    }
	}
  export interface Employeetable {
    employeeCode:string;
    Name:string;
    email:string;
    designation:string;
    department:string; 
    status:string;
  }





