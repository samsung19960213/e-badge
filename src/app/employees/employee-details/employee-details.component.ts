import { Component, OnInit, Inject } from '@angular/core';

import { Validators,FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { EmailValidator } from '@angular/forms';
import { Chart } from 'chart.js';
import { Url } from '../../Url';
import { EmployeeDetails } from '../employee.model';
import { HttpClient } from '@angular/common/http';
import { EmployeesService } from '../employees.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
 
  empId:number
  user: FormGroup;
  employeeDetails: any;


  constructor(private http: HttpClient, public empService: EmployeesService,  public dialog: MatDialog) {
    this.employeeDetails = new EmployeeDetails();
  }

  ngOnInit() {
    setTimeout(() => {
      this.createBarGraph();
  },500)
this.empId=this.empService.getEmployeeId();
  this.getDetails(this.empId);
    this.user = new FormGroup({
      useractive: new FormControl('', [Validators.required]),
      useraddressLine1: new FormControl('', [Validators.required]),
      useraddressLine2: new FormControl('', [Validators.required]),
      userage: new FormControl('', [Validators.required]),
      useralternateContactNo: new FormControl('', [Validators.required]),
      userbloodGroup: new FormControl('', [Validators.required]),
      usercity: new FormControl('', [Validators.required]),
      usercontactEmail: new FormControl('', [Validators.required]),
      usercountry: new FormControl('', [Validators.required]),
      userdateOfBirth: new FormControl('', [Validators.required]),
      userdepartmentId: new FormControl('', [Validators.required]),
      userdepartmentName: new FormControl('', [Validators.required]),
      userdesignationId: new FormControl('', [Validators.required]),
      userdesignationName: new FormControl('', [Validators.required]),
      userdistict: new FormControl('', [Validators.required]),
      useremployeeCode: new FormControl('', [Validators.required]),
      useremployeeImage: new FormControl('', [Validators.required]),
      userfirstName: new FormControl('', [Validators.required]),
      userformerComapnyJoinDate: new FormControl('', [Validators.required]),
      userformerCompanyEndDate: new FormControl('', [Validators.required]),
      userformerCompanyName: new FormControl('', [Validators.required]),
      usergender: new FormControl('', [Validators.required]),
      userid: new FormControl('', [Validators.required]),
      userisUser: new FormControl('', [Validators.required]),
      userjoiningDate: new FormControl('', [Validators.required]),
      userlandmark: new FormControl('', [Validators.required]),
      userlastName: new FormControl('', [Validators.required]),
      usermedicalInfo: new FormControl('', [Validators.required]),
      usermobileNo: new FormControl('', [Validators.required]),
      userpincode: new FormControl('', [Validators.required]),
      userqualification: new FormControl('', [Validators.required]),
      userstate: new FormControl('', [Validators.required]),
      useruserRoleId: new FormControl('', [Validators.required]),
      userworkExperince: new FormControl('', [Validators.required]),
      usersalary: new FormControl('', [Validators.required]),
      usershiftId: new FormControl('', [Validators.required]),
      userreportingManagerId:new FormControl('', [Validators.required]),
    });
  }
  getDetails(id:number) {
   

    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/employee/'+id )
        .subscribe((response: any) => {
          console.log(response);
          resolve(response);
          this.employeeDetails = response;
        }, reject);
       
    });

  }

  updateDetails(employeeDetails){
    console.log(employeeDetails);

    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + '/api/employee/save', employeeDetails)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
       alert('success')
    }); 
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
  deactiveDetails(){
 this.message();
  }

  message(): void {
      let dialogRef = this.dialog.open(MessagePopup, {
          width: '300px',

       


  });
}
}

@Component({
    selector: 'message-popup',
    templateUrl: './messagePopup.html',
    styleUrls: ['./employee-details.component.scss']
})

export class MessagePopup {
   id:number;
   
    constructor(private http: HttpClient,
        public message: MatDialogRef<MessagePopup>,@Inject(MAT_DIALOG_DATA) public data:any,  private empService: EmployeesService) {}
ngOnInit() {
    this.id =this.empService.getEmployeeId();
}
        closeMessage(): void {
            this.message.close();
        }
        deactivate() {
 console.log(this.id);
                  return new Promise((resolve, reject) => {
                    this.http.get(Url.API_URL + 'api/employee/deactivate/'+ this.id  )
                        .subscribe((response: any) => {
                            resolve(response);
                        }, reject);
            this.message.close();

                });
   
                
        }
    }