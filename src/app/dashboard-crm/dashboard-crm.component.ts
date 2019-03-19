import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgmMap } from '@agm/core';
import { Url } from '../Url';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {
activeEmployees:number;
presentEmployees:number;
leaveRequest:number;
numb: {};
userId: number;
date = new Date();
lateEntries:number;
 public dashCard = [
        { colorDark: '#294772', colorLight: '#375e97', number: this.activeEmployees, title: 'TEAM STRENGTH', icon: 'group',link:'/auth/employees/active-employees' },
      
        { colorDark: '#fa3c10', colorLight: '#fb6542', number: this.presentEmployees, title: 'PRESENT EMPLOYEES', icon: 'people_outline',link:'/auth/attendance/present' },
        { colorDark: '#e6a800', colorLight: '#ffbb00', number: this.lateEntries, title: 'LATE ENTRIES', icon: 'schedule', link:'/auth/attendance/late-comers' },
        { colorDark: '#335417', colorLight: '#3f681c', number: this.leaveRequest, title: 'PENDING LEAVE REQUEST', icon: 'drafts', link:'/auth/leaves/pending-leaves'}
    ];

    tableData = [
        { country: 'India', sales: 5400, percentage: '40%' },
        { country: 'Us', sales: 3200, percentage: '30.33%' },
        { country: 'Australia', sales: 2233, percentage: '18.056%' },
        { country: 'Spaim', sales: 600, percentage: '6%' },
        { country: 'China', sales: 200, percentage: '4.50%' },
        { country: 'Brazil', sales: 100, percentage: '2.50%' },
    ];
    title: string = 'My first AGM project';
	lat: number = 13.0265817;
	lng: number = 77.6258219;
	zoom: number = 8;
	height: string = '500px';
	@ViewChild(AgmMap) private myMap: any;
	@ViewChild('mapContainer') mapContainer: any;
    constructor(private http: HttpClient, private datePipe: DatePipe, public userService: UserService) { }

    ngOnInit() {
        this.userId= this.userService.EmployeeID;
        let today =this.datePipe.transform(this.date, 'yyyy-MM-dd');
        this.getDashboardCounts(today);
       
        
       
    }

getDashboardCounts(date:string) {
    return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + 'api/employee/getdashBoardCounts/'+date+'/'+this.userId )
            .subscribe((response: any) => {
                this.dashCard[0].number=response.getActiveEmployees;
                this.dashCard[1].number =response.getPresentEmployees;
                this.dashCard[2].number =response.getLateEntryEmployees;
                this.dashCard[3].number = response.getPendingLeaveRequest;
                resolve(response);
              
            }, reject);

    });
}
}
