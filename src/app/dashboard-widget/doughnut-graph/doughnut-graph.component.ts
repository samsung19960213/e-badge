import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from '../../user.service';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../Url';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cdk-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss']
})
export class DoughnutGraphComponent implements OnInit {
remainingLeaves:number;
acceptedLeaves:number;
rejectedLeaves:number;
pendingLeaves:number;
  constructor(public http: HttpClient, public datePipe: DatePipe, public userService: UserService) { }

  ngOnInit() {
   
    this.getDashboardCounts(this.userService.userId);
  }
  getDashboardCounts(id:number) {
    return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + 'api/leave/leaveCount/'+ id)
            .subscribe((response: any) => {
                console.log(response);
                this.remainingLeaves=response.remainingLeaves;
                this.acceptedLeaves= response.approvedLeaves;
                this.rejectedLeaves= response.rejectedLeaves;
                this.pendingLeaves= response.pendingLeaves;
                
                
                resolve(response);
                this.createDoughnutGraph();



            }, reject);

    });
}
    randomNumber(min=0, max=0) {
        if(min==0 || max== 0)
            return Math.round(Math.random() * 100);
        else
            return Math.random() * (max - min) + min;
    };
    randomBar(date, lastClose) {
        var open = this.randomNumber(lastClose * .95, lastClose * 1.05);
        var close = this.randomNumber(open * .95, open * 1.05);
        var high = this.randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
        var low = this.randomNumber(Math.min(open, close) * .9, Math.min(open, close));
        return {
            t: date.valueOf(),
            y: close
        };
    }

    createDoughnutGraph() {
        new Chart('doughnut-graph-graph', {
            type: 'doughnut',
            data: {
            labels: ['Approved Leaves ', 'Rejected Leaves', 'Pending Leaves','Remaining Leaves'],
            datasets: [ {
                data: [
                    this.acceptedLeaves,
                    this.rejectedLeaves,
                    this.pendingLeaves,
                    this.remainingLeaves,
                ],
                backgroundColor: [
                    'rgb(55,94,151)',
                    'rgb(251,101,66)',
                    'rgb(255,187,0)',
                    'rgb(63,104,28)'
                    
                ],
            }]},
            options: {
                elements : {
                    line: {
                        tension: 0.000001
                    }
                },
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                title: {
                    display: true,
                    text: 'LEAVE GRAPH'
                }
            }

    })
  }

}
