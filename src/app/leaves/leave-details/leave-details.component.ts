import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { LeaveService } from '../leaves.service';

import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss']
})
export class LeaveDetailsComponent implements OnInit {
id: number;
user: FormGroup;

dataSource: any;
    constructor(public form: FormBuilder, public leaveService: LeaveService,public http: HttpClient ) { 
        
  
    }
   

    ngOnInit() {
      this.id=this.leaveService.getLeaveId();
      this.getDetails(this.id);
      this.user = new FormGroup({
        id: new FormControl('', [Validators.required]),
        fromDate: new FormControl('', [Validators.required]),
        toDate: new FormControl('', [Validators.required]),
        reason: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        availableLeaves: new FormControl('', [Validators.required]),
        requestTime:new FormControl('', [Validators.required]),
      });
    
  }
  getDetails(id:number) {
   

    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/leave/'+id )
        .subscribe((response: any) => {
          console.log(response);
          resolve(response);
          this.dataSource = response;
          console.log(response);
          
        }, reject);
       
    });

  }
  accept() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/leave/admin/'+this.id+'/true' )
        .subscribe((response: any) => {
          console.log(response);
          resolve(response);
        
          
        }, reject);
        this.getDetails(this.id);
    });
  }
  reject(){
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/leave/admin/'+this.id+'/false' )
        .subscribe((response: any) => {
          console.log(response);
          resolve(response);
         
       
          
        }, reject);
        this.getDetails(this.id); 
    });
  }
}