import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';
import { EmployeeDetails } from '../employee.model';
import "aws-sdk/dist/aws-sdk.min";
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { DATEPICKER_HELPERS } from '../../material-widgets/datepicker/helpers.data';
import { ShiftDetails } from '../shift.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss']
})
export class AddEmployeesComponent implements OnInit {
  shiftList:any;
  departmentList: any;
  designationList:any;
  userRoleList:any;
  managerList:any;
  reportingMgr:any;
  userForm: FormGroup;
  employeeDetails: any;
  // shiftDetails= new ShiftDetails();
  startDate = new Date(1990, 0, 1);
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString())
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  events: string[] = [];
  myFilter = (d: Date): boolean => {
    const day = d.getDay();

    return day !== 0 && day !== 6;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  constructor(private http: HttpClient, public formBuilder: FormBuilder, public datePipe: DatePipe, public snackBar: MatSnackBar, public router:Router) {
    this.employeeDetails = new EmployeeDetails();
   
  }
  
  ngOnInit() {
    this.shift();
    this.designation();
    this.department();
    this.userRole();
    this.userForm = this.formBuilder.group({
      useractive: [, [Validators.required]],
      useraddressLine1: ['', [Validators.required]],
      useraddressLine2: ['', [Validators.required]],
      //userage: ['', [Validators.required,Validators.max(100), Validators.min(0)]],
      useralternateContactNo: ['', [Validators.required]],
      userbloodGroup: ['', [Validators.required]],
      usercity: ['', [Validators.required]],
      usercontactEmail: ['', [Validators.required, Validators.email]],
      usercountry: ['', [Validators.required]],
      userdateOfBirth: ['', [Validators.required]],
      userdepartmentId: ['', [Validators.required]],
      //userdepartmentName:  ['', [Validators.required]],
      userdesignationId: ['', [Validators.required]],
      //userdesignationName: ['', [Validators.required]],
      userdistict: ['', [Validators.required]],
      // useremployeeCode: ['', [Validators.required]],
      //useremployeeImage: ['', [Validators.required]],
      userfirstName: ['', [Validators.required, Validators.maxLength(25)]],
      userformerComapnyJoinDate: ['', [Validators.required]],
      userformerCompanyEndDate: ['', [Validators.required]],
      userformerCompanyName: ['', [Validators.required]],
      usergender: ['', [Validators.required]],
      //userid:  ['', [Validators.required]],
      userisUser: ['', [Validators.required]],
      userjoiningDate: ['', [Validators.required]],
      userlandmark: ['', [Validators.required]],
      userlastName: ['', [Validators.required]],
      usermedicalInfo: ['', [Validators.required]],
      usermobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      userpincode: ['', [Validators.required, Validators.maxLength(6)]],
      userqualification: ['', [Validators.required]],
      userstate: ['', [Validators.required]],
      useruserRoleId: ['', [Validators.required]],
      userworkExperince: ['', [Validators.required]],
      usersalary: ['', [Validators.required]],
      usershiftId: ['', [Validators.required]],
      userreportingManagerId: ['', [Validators.required]],


    });
    this.shiftList = [];
  }
  saveDetails(employeeDetails: EmployeeDetails) {
  // this.datePipe.transform(this.employeeDetails.joiningDate, 'yyyy-MM-dd');
  //   this.datePipe.transform(this.employeeDetails.formerComapnyJoinDate, 'yyyy-MM-dd');
  //   this.datePipe.transform(this.employeeDetails.formerCompanyEndDate, 'yyyy-MM-dd');
    console.log(employeeDetails);

    return new Promise((resolve, error) => {
      this.http.post(Url.API_URL + 'api/employee/save', employeeDetails)
        .subscribe((response: any) => {
          resolve(response);
          this.router.navigateByUrl('auth/dashboard');
          this.snackBar.open('Saved Successfully', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
         
        }, (error:any) => { 
          this.snackBar.open('Email or Password is already registered with us', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
         }  );
     
    });
  
  }
join(type: string, event: MatDatepickerInputEvent<Date>){
    this.employeeDetails.formerCompanyJoinDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
    
  }
  end(type: string, event: MatDatepickerInputEvent<Date>){
    this.employeeDetails.formerCompanyEndDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
    
  }

  DOB(type: string, event: MatDatepickerInputEvent<Date>){
    this.employeeDetails.dateOfBirth =this.datePipe.transform(event.value, 'yyyy-MM-dd');
    
  }
  joiningDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.employeeDetails.joiningDate =this.datePipe.transform(event.value, 'yyyy-MM-dd');
    
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
  datepickerHelpers: any = DATEPICKER_HELPERS;

}