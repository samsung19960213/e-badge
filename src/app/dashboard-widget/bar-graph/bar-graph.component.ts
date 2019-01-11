import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'cdk-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {
    attendance:any[]=[];
    dates:any[]=[];
    empID:number;
    date = new Date();
    year = this.date.getFullYear();
    month = this.date.getMonth();
    
    firstDay = new Date(this.year, this.month, 1);
    lastDay = new Date(this.year, this.month + 1, 0);
    startDate:string;
    endDate:string;
    
  constructor(private http: HttpClient, public userService: UserService,public datePipe: DatePipe) { }

  ngOnInit() {
      this.empID =this.userService.EmployeeID;
    this.getAttendance(this.empID);
      setTimeout(() => {
          this.createBarGraph();
      },500)
  }
  
  getAttendance(id:number){
         
     this.startDate =this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
     this.endDate =this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
     
    return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + 'api/attendance/working/hoursbetweendate/'+ id + '/'+ this.startDate + '/'+ this.endDate)
            .subscribe((response: any) => {
                console.log(response);
                length=response.length;
                for(var i=0; i< length; i++){
                var str = response[i].timeSum; 
                this.dates.push(response[i].date);
                var splitted = str.split(":", 3); 
                console.log(splitted)
                this.attendance.push(splitted[0]);
                }
                resolve(response);
                console.log(this.dates);
               console.log(this.attendance);
            }, reject);

    });
   
}

  createBarGraph() {
      new Chart('dash-bar-graph', {
            type: 'bar',
            data: {
                labels:this.dates,
                datasets: [
                    {
                        backgroundColor: 'rgba(92, 107, 192, .7)',
                        borderColor: 'rgba(92, 107, 192, .7)',
                        data: this.attendance,
                        label: 'Hours per day',
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
                    display: false
                },
                scales : {
                    yAxes: [{
                       ticks: {
                          steps : 3,
                          stepValue : 5,
                          max :15,
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
                    text: 'Weekly Attendance Graph '
                }
            }
        })
  }
}
