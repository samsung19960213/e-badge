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
totalEmployees:number;
presentEmployees:number;
lateEntries:number;
date=new Date();
absentEmployees:number;
  constructor(public http: HttpClient, public datePipe: DatePipe) { }

  ngOnInit() {
    let today =this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.getDashboardCounts(today);
  }
  getDashboardCounts(date:string) {
    return new Promise((resolve, reject) => {
        this.http.get(Url.API_URL + '/api/employee/getdashBoardCounts/'+date )
            .subscribe((response: any) => {
                console.log(response);
                 this.totalEmployees=response.getActiveEmployees;
                 this.presentEmployees=response.getPresentEmployees;
                 this.lateEntries=response.getLateEntryEmployees;
                 this.absentEmployees= response.getActiveEmployees-response.getPresentEmployees;
                
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
            labels: ['Total Employees ', 'Presesnt Employees', 'Absent Employees'],
            datasets: [ {
                data: [
                    this.totalEmployees,
                    this.presentEmployees,
                    this.absentEmployees,
                   
                ],
                backgroundColor: [
                    'rgba(255, 99, 132,.7)',
                    'rgba(92, 107, 192,.7)',
                    'rgba(66, 165, 245,.7)',
                    
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
                    text: 'ATTENDANCE GRAPH'
                }
            }

    })
  }

}
