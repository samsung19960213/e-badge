import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { Url } from '../Url';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {
activeEmployees:number=8;
presentEmployees:number=0;
leaveRequest:number=1;
lateEntries:number=0;
    public dashCard = [
        { colorDark: '#5C6BC0', colorLight: '#7986CB', number: this.activeEmployees, title: 'TOTAL NO EMPLOYEES', icon: 'group' },
      
        { colorDark: '#26A69A', colorLight: '#4DB6AC', number: this.presentEmployees, title: 'PRESENT EMPLOYEES', icon: 'group' },
        { colorDark: '#66BB6A', colorLight: '#81C784', number: this.lateEntries, title: 'LATE ENTRIES', icon: 'account_balance' },
        { colorDark: '#cc99ff', colorLight: '#e6ccff', number: this.leaveRequest, title: 'LEAVE REQUEST', icon: 'account_balance' }
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
        console.log("hiiuiiiii");
        this.getDashboardCounts();
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
                this.activeEmployees=response.getActiveEmployees;
                this.presentEmployees =response.getPresentEmployees;
                this.leaveRequest= response.getPendingLeaveRequest;
                console.log(this.activeEmployees);
                resolve(response);
              
            }, reject);

    });
}
}
