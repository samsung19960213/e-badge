import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LeaveService } from '../../leaves/leaves.service';
// import { single } from './data';


@Component({
  selector: 'cdk-bar-graph-1',
  templateUrl: './bar-graph1.component.html',
  styleUrls: ['./bar-graph1.component.scss']
})
export class BarGraph1Component implements OnInit {
  dataSource: any[] = [];
  name: any[] = [];
  value: any[] = [];
  empID: number;

  single: any[];
  multi: any[];

  view: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Months';
  showYAxisLabel = true;
  yAxisLabel = 'No of active people on leave';

  colorScheme = {
    domain: ['#2D0E60', '#2D0E60', '#2D0E60', '#2D0E60', '#2D0E60', '#2D0E60', '#2D0E60', '#2D0E60', '#2D0E60', '#2D0E60', '#2D0E60', '#2D0E60']
  };

  constructor(private http: HttpClient,
    public userService: UserService,
    public leaveService: LeaveService,
    public datePipe: DatePipe,
    public router: Router) {

  }
  ngOnInit() {
    this.empID = this.userService.EmployeeID;
    this.getAttendance(this.empID);
    setTimeout(() => {
      this.createBarGraph();
    }, 500)
  }
  getAttendance(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/attendance/absentees/month/' + id)
        .subscribe((response: any) => {
          this.dataSource = response;
          resolve(response);
        }, reject);
    });
  }
  // onSelect(i){

  //     console.log(i);
  //     // this.router.navigateByUrl('auth/attendance/monthly-absentees');

  // }

  createBarGraph() {
    new Chart('dash-bar-graph-1', {
      type: 'bar',
      data: {
        labels: this.name,
        datasets: [
          {
            backgroundColor: 'rgba(66, 165, 245, .7)',
            borderColor: 'rgba(66, 165, 245, .7)',
            data: this.value,
            label: 'No of people on leave ',
            fill: 'false'
          },

          // {
          //     backgroundColor: 'rgba(66, 165, 245, .7)',
          //     borderColor: 'rgba(69, 39, 160, .7)',
          //     data: [80, 88, 67, 95, 76, 60, 67, 95,95,66],
          //     label: 'Dataset',
          //     fill: 'false'
          // },
          // {
          //     backgroundColor: 'rgba(38, 166, 154, .7)',
          //     borderColor: 'rgba(69, 39, 160, .7)',
          //     data: [60, 88, 70, 67, 27, 83, 78, 88,95,60],
          //     label: 'Dataset',
          //     fill: 'false'
          // },
          // {
          //     backgroundColor: 'rgba(102, 187, 106, .7)',
          //     borderColor: 'rgba(255, 99, 132)',
          //     data: [75, 55, 55, 95, 66, 88, 70, 78,77,100],
          //     label: 'Dataset',
          //     fill: 'false'
          // }
        ]
      },
      options: {
        legend: {
          display: false,

        },
        scales: {
          yAxes: [{
            ticks: {
              steps: 5,
              min: 0,
            }
          }]
        },
        elements: {
          line: {
            tension: 0.000001
          }
        },
        maintainAspectRatio: false,
        plugins: {
          filler: {
            propagate: false
          }
        },
        title: {
          display: true,
          text: 'Monthly Absentees Count Graph'
        }
      }
    })
  }

  onSelect(event) {
    let selMonth = this.datePipe.transform("01 "+event.name, 'yyyy-MM');
    this.leaveService.setDateMonth(selMonth);
    this.router.navigateByUrl('auth/attendance/monthly-absentees');
  }
  labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: this.name,
      data: this.value
    },
    // { 
    //   label: '2nd Year',
    //   data: [47, 9, 28, 54, 77, 51, 24]
    // }
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]

  // CHART CLICK EVENT.
  onChartClick(event) {
    // console.log(event);
  }
  // testData = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   }
  // ];
}

