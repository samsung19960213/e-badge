import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';
import { Url } from '../../Url';
import { resolve } from 'url';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  dataSource = new MatTableDataSource<Holidaytable>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient,private userService:UserService) { }
  displayedColumns = ["seqNo", "description", "date"];
  
  ngOnInit() {
    
    this.holidayList().then(data=>{
      this.dataSource.data=data;
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  holidayList(): Promise<any> {
    
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/leaveDates/company/' + this.userService.companyId)
        .subscribe((response: any) => {
          resolve(response);
          
        }, reject);
    });
  }

}
export interface Holidaytable {
  id: number;
  leaveName: string;
  leaveDate: string;
  
}