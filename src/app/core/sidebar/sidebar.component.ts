import { Component, OnInit, Input } from '@angular/core';
import { Url } from '../../Url';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LeaveService } from '../../leaves/leaves.service';
import { UserService } from '../../user.service';


@Component({
  selector: 'cdk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    roleId:number;
    constructor(private http: HttpClient,
         public datePipe: DatePipe,
         public route: Router,
         public leaveService:LeaveService,
        public userService:UserService) {}
  ngOnInit() {
    this.roleId= this.userService.userId;
      this.firstDate();
  }

  today: number = Date.now();
  // public bufferValue;

    events = [
          {
            id: 'id',
            title: 'Business Meeting',
            time: '05:00 PM',
            state: 'state'
        },
        {
            id: 'id',
            title: 'Ask for a Vacation',
            time: '05:00 PM',
            state: 'state'
        },
        {
            id: 'id',
            title: 'Dinner with Micheal',
            time: '05:00 PM',
            state: 'state'
        },
        {
            id: 'id',
            title: 'Deadline for Project ABC',
            time: '05:00 PM',
            state: 'state'
        },
    ];

    todolists = [
          {
            id: 'id',
            title: 'Get to know Angular more',
            time: 'Added:4 days ago',
        },
        {
            id: 'id',
            title: 'Configure new Router',
            time: 'Added:4 days ago',
        },
        {
            id: 'id',
            title: 'Invite Joy to play Carroms',
            time: 'Added:4 days ago',
        },
        {
            id: 'id',
            title: 'Check SRS of Project X',
            time: 'Added:4 days ago',
        },
    ];

    messages = [];
    firstDate(): Promise<any> {
        let latest_date =this.datePipe.transform(this.today, 'yyyy-MM-dd');
        return new Promise((resolve, reject) => {
   
      this.http.get(Url.API_URL + 'api/leave/leaverequestlist'+'/' + this.roleId)
        
          .subscribe((response: any) => {
         
           this.messages=response;
            resolve(response);
          },reject);
        
        });
      }
      leaveRoute(id:number) {
          
        this.leaveService.setLeaveId(id);
        this.route.navigateByUrl('auth/leaves/leave-details');
        
      }
}
