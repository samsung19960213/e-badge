import { Component, OnInit, Inject } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EmailValidator } from '@angular/forms';
import { Chart } from 'chart.js';
import { Url } from '../../Url';
import { EmployeeDetails } from '../employee.model';
import { HttpClient } from '@angular/common/http';
import { EmployeesService } from '../employees.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

    empId: number
    user: FormGroup;
    employeeDetails: any;
   attendance: any[]=[];
   color:any[]=[];
    dates:any[]=[];
    empID:number;
    date = new Date();
    year = this.date.getFullYear();
    month = this.date.getMonth();
    shiftList:any;
    userRoleList:any;
    departmentList: any;
    designationList:any;
    managerList:any;
    reportingMgr:any;
    firstDay = new Date(this.year, this.month, 1);
    lastDay = new Date(this.year, this.month + 1, 0);
    startDate:string;
    endDate:string;
userId:number;
    constructor(private http: HttpClient, public empService: EmployeesService, public dialog: MatDialog, public datePipe: DatePipe, public snackBar: MatSnackBar, public router: Router, public userService: UserService) {
        this.employeeDetails = new EmployeeDetails();
    }

    ngOnInit() {
        this.userId= this.userService.userroleId;
        this.empId = this.empService.getEmployeeId();
        let fromDate =this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
        let toDate =this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
        this.userRole();
        this.getAttendance(fromDate,toDate);
        this.department();
        this.designation();
        this.shift();
        
      
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
            userreportingManagerId: new FormControl('', [Validators.required]),
        });
    }
    getDetails(id: number) {


        return new Promise((resolve, reject) => {
            this.http.get(Url.API_URL + '/api/employee/employee/' + id)
                .subscribe((response: any) => {
                    console.log(response);
                    resolve(response);
                    this.employeeDetails = response;
                    this.reportMgr(this.employeeDetails.reportingManagerId);
                }, reject);

        });

    }
    shift(): Promise<any> {
        return new Promise((resolve, reject) => {
    
          this.http.get(Url.API_URL + 'api/shift/all')
            .subscribe((response: any) => {
              console.log(response[0].shiftName)
              this.shiftList = response;
             
              console.log(this.shiftList[1].shiftName)
              resolve(response);
            }, reject);
    
        });
      }
      reportMgr(id:string): Promise<any> {
        console.log(id);
        return new Promise((resolve, reject) => {
    
          this.http.get(Url.API_URL + 'api/employee/getReportingManager/'+ id )
            .subscribe((response: any) => {
              console.log(response);
             this.managerList = response;
              resolve(response);
            }, reject);
    
        });
      }
      designation(): Promise<any> {
        
        return new Promise((resolve, reject) => {
    
          this.http.get(Url.API_URL + 'api/desigantion/all' )
            .subscribe((response: any) => {
              console.log(response);
             this.designationList = response;
              resolve(response);
            }, reject);
    
        });
      }
      department(): Promise<any> {
        
        return new Promise((resolve, reject) => {
    
          this.http.get(Url.API_URL + '/api/department/all' )
            .subscribe((response: any) => {
              console.log(response);
             this.departmentList = response;
              resolve(response);
            }, reject);
    
        });
      }
      userRole(): Promise<any> {
        
        return new Promise((resolve, reject) => {
    
          this.http.get(Url.API_URL + 'api/userrole/all' )
            .subscribe((response: any) => {
              console.log(response);
             this.userRoleList = response;
              resolve(response);
            }, reject);
    
        });
      }
    updateDetails(employeeDetails) {
        console.log(employeeDetails);

        return new Promise((resolve, reject) => {
            this.http.post(Url.API_URL + '/api/employee/save', employeeDetails)
                .subscribe((response: any) => {
                    resolve(response);
                    this.snackBar.open('Updated Successful', 'OK', {
                        duration: 2000,
                        verticalPosition: 'top',
                      });
                      this.router.navigateByUrl('auth/dashboard');
                }, reject=>{
                    this.snackBar.open('Invalid Format', 'OK', {
                        duration: 2000,
                        verticalPosition: 'top',
                      });
                });
            
        
        });
    }
    fileEvent(fileInput: any) {
        let windows: any = window;
        let AWSService = windows.AWS;
    
        let file = fileInput.target.files[0];
      
        AWSService.config.accessKeyId = Url.AWS_AccessKeyId;
        AWSService.config.secretAccessKey = Url.AWS_SecretAccessKey;
        let bucket = new AWSService.S3({ params: { Bucket: Url.AWS_BucketName } });
        let params = { Key: file.name, Body: file };
        let fileEveThis = this;
        bucket.upload(params, function (error, response) {
          console.log(response.Location);
          fileEveThis.employeeDetails.employeeImage = response.Location;
        });
      }
    getAttendance(firstDay:string, lastDay:string){
         
        this.startDate =this.datePipe.transform(firstDay, 'yyyy-MM-dd');
        this.endDate =this.datePipe.transform(lastDay, 'yyyy-MM-dd');
        this.attendance=[];
        this.dates=[];
        this.color=[];
        
       return new Promise((resolve, reject) => {
           this.http.get(Url.API_URL + 'api/attendance/working/hoursbetweendate/'+ this.empId + '/'+ this.startDate + '/'+ this.endDate)
               .subscribe((response: any) => {
                   console.log(response);
                   length=response.length;
                   for(var i=0; i< length; i++){
                   var str = response[i].timeSum; 
                   this.dates.push(this.datePipe.transform(response[i].date, 'dd-MMM-yy'));
                   var splitted = str.split(":", 3); 
                   console.log(splitted)
                   
                   this.attendance.push(splitted[0]);
                   if(splitted[0]> 8){
                   this.color.push('#3f681c');}
                   else if(splitted[0]>5){
                       this.color.push('#294772');
                   }
                   else{
                       this.color.push('#fa3c10');
                   }
                   }
                   resolve(response);
                   console.log(this.dates);
                  console.log(this.attendance);
                  this.createBarGraph();
               }, reject);
   
       });
    }
    fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
      
        let toDate = this.datePipe.transform(this.lastDay, 'yyyy-MM-dd');
        let fromDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
        console.log(toDate);
        this.getAttendance(fromDate, toDate);
       
      }
       toDate(type: string, event: MatDatepickerInputEvent<Date>) {
        let fromDate = this.datePipe.transform(this.firstDay, 'yyyy-MM-dd');
        let toDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
        console.log(toDate);
    this.getAttendance(fromDate, toDate);
       }
    createBarGraph() {
        new Chart('dash-bar-graph', {
            type: 'bar',
            data: {
                labels: this.dates,
                datasets: [
                    {
                        backgroundColor: this.color,
                        borderColor: 'rgba(92, 107, 192, .7)',
                        data: this.attendance,
                        label: 'Working Hours',
                        fill: 'false'
                    },
                    // {
                    //     backgroundColor: 'rgba(66, 165, 245, .7)',
                    //     borderColor: 'rgba(69, 39, 160, .7)',
                    //     data: [80, 88, 67, 95, 76, 60, 67, 95, 95, 66],
                    //     label: 'Attendance',
                    //     fill: 'false'
                    // },
                    // {
                    //     backgroundColor: 'rgba(38, 166, 154, .7)',
                    //     borderColor: 'rgba(69, 39, 160, .7)',
                    //     data: [60, 88, 70, 67, 27, 83, 78, 88, 95, 60],
                    //     label: 'Attendance',
                    //     fill: 'false'
                    // },
                    // {
                    //     backgroundColor: 'rgba(102, 187, 106, .7)',
                    //     borderColor: 'rgba(255, 99, 132)',
                    //     data: [75, '55', 55, 95, 66, 88, 70, 78, 77, 100],
                    //     label: 'Attendance',
                    //     fill: 'false'
                    // }
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                    
                },
                scales : {
                    yAxes: [{
                       ticks: {
                          steps : 2,
                          stepValue :4,
                          max :16,
                          min:0,
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
                    text: 'ATTENDANCE GRAPH'
                }
            }
        })
    }
    deactiveDetails() {
        this.message();
    }

    message(): void {
        let dialogRef = this.dialog.open(MessagePopup, {
            width: '400px',



        });
    }
}

@Component({
    selector: 'message-popup',
    templateUrl: './messagePopup.html',
    styleUrls: ['./employee-details.component.scss']
})

export class MessagePopup {
    id: number;
    reason: string;
    url:string;
    fileSelected:File=null;
    attachmentName: any;
    attachmentSize:any;

    constructor(private http: HttpClient,
        public message: MatDialogRef<MessagePopup>, @Inject(MAT_DIALOG_DATA) public data: any, private empService: EmployeesService) { }
    ngOnInit() {
        this.id = this.empService.getEmployeeId();
    }
    closeMessage(): void {
        this.message.close();
    }
    deactivate() {
        console.log(this.id);
        return new Promise((resolve, reject) => {
            this.http.get(Url.API_URL + 'api/employee/deactivate/' + this.id + '?rejectReason=' + this.reason + '&rejectFileUrl=' + this.url)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
            alert('User deactivated successfully');
            this.message.close();

        });


    }
    handleFileInput(files: FileList) {
        this.fileSelected = files.item(0);
        this.attachmentName = this.fileSelected.name.toString();
        this.attachmentSize = "(" + (this.fileSelected.size / 1024).toFixed(2) + "KB)";
        this.uploadFileToActivity(files.item(0));
    }

    uploadFileToActivity(file: File) {
        let filePath = undefined;
        let windows: any = window;
        let AWSService = windows.AWS;

        AWSService.config.accessKeyId = Url.AWS_AccessKeyId;
        AWSService.config.secretAccessKey = Url.AWS_SecretAccessKey;
        let bucket = new AWSService.S3({ params: { Bucket: Url.AWS_BucketName } });
        let params = { Key: file.name, Body: file };
        let deactivatefile = this;

        bucket.upload(params, function (error, response) {
            deactivatefile.url = response.Location;
        });

    }
}
// export class attendance{
//     data:any[]=[];
//     color:string;
// }