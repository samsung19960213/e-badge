import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LeaveService } from '../../leaves/leaves.service';


@Component({
  selector: 'cdk-bar-graph-1',
  templateUrl: './bar-graph1.component.html',
  styleUrls: ['./bar-graph1.component.scss']
})
export class BarGraph1Component implements OnInit {
  dataSource:any[]=[];
    dates:any[]=[];
    count:any[]=[];
    empID:number;
   
   
  
  constructor(private http: HttpClient, public userService: UserService,public leaveService: LeaveService ,public datePipe: DatePipe, public router:Router) { }


  ngOnInit() {
    this.empID =this.userService.EmployeeID;
    this.getAttendance(this.empID);
      setTimeout(() => {
          this.createBarGraph();
      },500)
  }
  
  getAttendance(id:number){
    return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + 'api/attendance/absentees/month/'+ id)
            .subscribe((response: any) => {
                this.dataSource= response;
                console.log(this.dataSource);
                console.log(this.dataSource.length);
                
                for(var i=0 ; i< this.dataSource.length; i++){
               this.count.push(this.dataSource[i].count);
               this.dates.push(this.dataSource[i].month);
               this.leaveService.setDateMonth([this.dates[i]]);
               //this.dates.push(this.datePipe.transform(this.dataSource[i].month, 'dd-MMM-yy'));
                }
                console.log(this.count);
                console.log(this.dates);
                resolve(response);
                
            }, reject);

    });
   
}
GoTo(){
    this.router.navigateByUrl('auth/attendance/monthly-absentees');
    
}
  createBarGraph() {
      new Chart('dash-bar-graph-1', {
            type: 'bar',
            data: {
                labels:this.dates,
                datasets: [
                    {
                        backgroundColor: 'rgba(66, 165, 245, .7)',
                        borderColor: 'rgba(66, 165, 245, .7)' ,
                        data: this.count,
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
                scales : {
                    yAxes: [{
                       ticks: {
                        steps:5,
                          min:0,
                        }
                    }] 
                  },
                elements : {
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
}
