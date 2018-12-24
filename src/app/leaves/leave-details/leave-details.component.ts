import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup } from '@angular/forms';
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
    constructor(public form: FormBuilder, public leaveService: LeaveService,public http: HttpClient ) { 
        
  
    }
   

    ngOnInit() {
      this.id=this.leaveService.getLeaveId();
      this.getDetails(this.id);
  }
  getDetails(id:number) {
   

    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/api/leave/'+id )
        .subscribe((response: any) => {
          console.log(response);
          resolve(response);
          console.log(response);
          
        }, reject);
       
    });

  }
}