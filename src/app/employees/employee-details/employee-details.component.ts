import { Component, OnInit } from '@angular/core';

import { Validators,FormBuilder,FormGroup } from '@angular/forms';
import { EmailValidator } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  public profileForm:FormGroup;
  submitted = false;
  hide;
    constructor(public form: FormBuilder) { 
        this.profileForm = this.form.group({
               username:['',{validators: [Validators.minLength(6)], updateOn: 'blur'}],
              email:['',Validators.required],
              number:[ '',{validators: [Validators.minLength(10)], updateOn: 'blur'}],
              pwd:['',Validators.required]
           });
  
    }
    get number() {
    return this.profileForm.get('number');
  }
    get username() {
    return this.profileForm.get('username');
  }
   get email() {
    return this.profileForm.get('email');
  }
    // checkUserExists() {
      
         
    //         this.profileForm.value.userName.setErrors({ userExists: `User Name  already exists` });
         
    // }
   onSubmit() { 
     console.log('');
     this.submitted = true; }
    ngOnInit() {
      setTimeout(() => {
        this.createBarGraph();
    },500)
    }
  
    createBarGraph() {
      new Chart('dash-bar-graph', {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                datasets: [
                    {
                        backgroundColor: 'rgba(92, 107, 192, .7)',
                        borderColor: 'rgba(92, 107, 192, .7)',
                        data: [70,70,70,70,70,70,70,70],
                        label: 'Dataset',
                        fill: 'false'
                    },
                    {
                        backgroundColor: 'rgba(66, 165, 245, .7)',
                        borderColor: 'rgba(69, 39, 160, .7)',
                        data: [80, 88, 67, 95, 76, 60, 67, 95,95,66],
                        label: 'Dataset',
                        fill: 'false'
                    },
                    {
                        backgroundColor: 'rgba(38, 166, 154, .7)',
                        borderColor: 'rgba(69, 39, 160, .7)',
                        data: [60, 88, 70, 67, 27, 83, 78, 88,95,60],
                        label: 'Dataset',
                        fill: 'false'
                    },
                    {
                        backgroundColor: 'rgba(102, 187, 106, .7)',
                        borderColor: 'rgba(255, 99, 132)',
                        data: [75, 55, 55, 95, 66, 88, 70, 78,77,100],
                        label: 'Dataset',
                        fill: 'false'
                    }
                ]
            },
            options: {
                legend: {
                    display: false
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
                    text: 'SALES GRAPH'
                }
            }
        })
  }
  }
  