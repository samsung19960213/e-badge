import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgmMap } from '@agm/core';
import { Url } from '../Url';
import { HttpClient } from '@angular/common/http';

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
lateEntries:number;
 public dashCard = [
        { colorDark: '#5C6BC0', colorLight: '#7986CB', number: this.activeEmployees, title: 'TOTAL NO EMPLOYEES', icon: 'group',link:'/auth/employees/employee-table' },
      
        { colorDark: '#26A69A', colorLight: '#4DB6AC', number: this.presentEmployees, title: 'PRESENT EMPLOYEES', icon: 'group',link:'/auth/employees/active-employees' },
        { colorDark: '#66BB6A', colorLight: '#81C784', number: this.lateEntries, title: 'LATE ENTRIES', icon: 'account_balance', link:'' },
        { colorDark: '#cc99ff', colorLight: '#e6ccff', number: this.leaveRequest, title: 'LEAVE REQUEST', icon: 'account_balance', link:'/auth/leaves/leave-list'}
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
    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getDashboardCounts().then(data => {
         this.numb =data;
          })
           
        console.log("hiiuiiiii");
      
        setTimeout(() => {
			console.log(this.mapContainer.nativeElement.offsetHeight);
			// let h = this.mapContainer.nativeElement.offsetHeight - 10;
			// this.height = String(h) + 'px';
		},300);
    }
  
getDashboardCounts() {
    return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + '/api/employee/getdashBoardCounts' )
            .subscribe((response: any) => {
                console.log(response);
                this.dashCard[0].number=response.getActiveEmployees;
                this.dashCard[1].number =response.getPresentEmployees;
                this.dashCard[3].number = response.getPendingLeaveRequest;
                console.log(this.activeEmployees);
                resolve(response);
              
            }, reject);

    });
}
}
