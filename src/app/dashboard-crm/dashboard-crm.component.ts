import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {

    public dashCard = [
        { colorDark: '#5C6BC0', colorLight: '#7986CB', number: 2000, title: 'TOTAL NO EMPLOYEES', icon: 'group' },
        { colorDark: '#42A5F5', colorLight: '#64B5F6', number: 100, title: 'ABSENT EMPLOYEES', icon: 'group' },
        { colorDark: '#26A69A', colorLight: '#4DB6AC', number: 1900, title: 'PRESENT EMPLOYEES', icon: 'group' },
        { colorDark: '#66BB6A', colorLight: '#81C784', number: 1221, title: 'LATE ENTRIES', icon: 'account_balance' },
        { colorDark: '#cc99ff', colorLight: '#e6ccff', number: 1221, title: 'LEAVE REQUEST', icon: 'account_balance' }
    ];

    tableData = [
        { country: 'India', sales: 5400, percentage: '40%' },
        { country: 'Us', sales: 3200, percentage: '30.33%' },
        { country: 'Australia', sales: 2233, percentage: '18.056%' },
        { country: 'Spaim', sales: 600, percentage: '6%' },
        { country: 'China', sales: 200, percentage: '4.50%' },
        { country: 'Brazil', sales: 100, percentage: '2.50%' },
    ];

    constructor() { }

    ngOnInit() {
    }

}
