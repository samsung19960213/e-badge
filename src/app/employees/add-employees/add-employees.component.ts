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
import { UserService } from '../../user.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss']
})
export class AddEmployeesComponent implements OnInit {
  branchList: any;
  shiftList: any;
  departmentList: any;
  designationList: any;
  userRoleList: any;
  managerList: any;
  reportingMgr: any;
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
  constructor(private http: HttpClient,
    public formBuilder: FormBuilder,
    public datePipe: DatePipe,
    public snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService,
    private spinnerSerivce: NgxSpinnerService) {
    this.employeeDetails = new EmployeeDetails();

  }

  ngOnInit() {
    this.shift();
    this.designation();
    this.department();
    this.userRole();
    this.getBranchesByCompanyId();
    this.userForm = this.formBuilder.group({
      useractive: [1, [Validators.required]],
      useraddressLine1: ['', [Validators.required]],
      useraddressLine2: [''],
      //userage: ['', [Validators.required,Validators.max(100), Validators.min(0)]],
      useralternateContactNo: ['', [Validators.min(999999999),
      Validators.max(9999999999), Validators.pattern(
        "^([0-9]+)$"
      )]],
      userbloodGroup: ['', [Validators.required]],
      usercity: ['', [Validators.required]],
      usercontactEmail: ['', [Validators.required, Validators.pattern(
        "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\- \\.]+)\\.([a-zA-Z]{2,5})$"
      )]],
      usercountry: ['', [Validators.required]],
      userdateOfBirth: ['', [Validators.required]],
      userdepartmentId: ['', [Validators.required]],
      //userdepartmentName:  ['', [Validators.required]],
      userdesignationId: ['', [Validators.required]],
      //userdesignationName: ['', [Validators.required]],
      userdistict: ['', [Validators.required]],
      useremployeeCode: ['', [Validators.required]],
      //useremployeeImage: ['', [Validators.required]],
      userfirstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$"),
      Validators.minLength(1)]],
      userformerComapnyJoinDate: [''],
      userformerCompanyEndDate: [''],
      userformerCompanyName: [''],
      usergender: ['', [Validators.required]],
      //userid:  ['', [Validators.required]],
      userisUser: [1, [Validators.required]],
      userjoiningDate: ['', [Validators.required]],
      userlandmark: [''],
      userlastName: ['', [Validators.pattern("^[a-zA-Z ]*$")]],
      usermedicalInfo: [''],
      usermobileNo: ['', [Validators.required, Validators.min(999999999),
      Validators.max(9999999999), Validators.pattern(
        "^([0-9]+)$"
      )]],
      userpincode: ['', [Validators.required, Validators.pattern('^\\b\\d{6}$')]],
      userqualification: [''],
      userstate: ['', [Validators.required]],
      role: ['', [Validators.required]],
      //userworkExperince: ['', [Validators.required]],
      usersalary: [''],
      userShift: ['', [Validators.required]],
      employmentType: ['', [Validators.required]],
      employerName: ['', [Validators.required]],
      reportingName: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
    });
    this.shiftList = [];
  }

  getBranchesByCompanyId(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.http.get(Url.API_URL + 'api/branch/all/branches/' + this.userService.companyId)
        .subscribe((response: any) => {
          this.branchList = response;
          // console.log(this.shiftList[1].shiftName)
          resolve(response);
        }, reject);

    });

  }

  saveDetails(employeeDetails: EmployeeDetails) {
    this.spinnerSerivce.show();
    return new Promise((resolve, error) => {
      console.log(employeeDetails)
      employeeDetails.companyId = this.userService.companyId;
      this.http.post(Url.API_URL + 'api/employee/save', employeeDetails)
        .subscribe((response: any) => {
          resolve(response);
          this.router.navigateByUrl('auth/dashboard');
          this.spinnerSerivce.hide();
          this.snackBar.open('Saved Successfully', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
        }, (error: any) => {
          this.spinnerSerivce.hide();
          this.snackBar.open('Email or Mobile Number is already registered with us', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
        });
    });

  }
  join(type: string, event: MatDatepickerInputEvent<Date>) {
    this.employeeDetails.formerCompanyJoinDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');

  }
  end(type: string, event: MatDatepickerInputEvent<Date>) {
    this.employeeDetails.formerCompanyEndDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');

  }

  DOB(type: string, event: MatDatepickerInputEvent<Date>) {
    this.employeeDetails.dateOfBirth = this.datePipe.transform(event.value, 'yyyy-MM-dd');

  }
  joiningDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.employeeDetails.joiningDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');

  }
  //getting shift 
  shift(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.http.get(Url.API_URL + 'api/shift/company/' + this.userService.companyId)
        .subscribe((response: any) => {
          this.shiftList = response;
          // console.log(this.shiftList[1].shiftName)
          resolve(response);
        }, reject);

    });
  }
  //getting reporting manager by id
  reportMgr(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/employee/getReportingManager/' + id)
        .subscribe((response: any) => {
          this.managerList = response;
          resolve(response);
        }, reject);
    });
  }
  //getting designation
  designation(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/desigantion/company/' + this.userService.companyId)
        .subscribe((response: any) => {
          this.designationList = response;
          resolve(response);
          // console.log(response);
        }, reject);
    });
  }
  //getting user role 
  userRole(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/userrole/all')
        .subscribe((response: any) => {
          this.userRoleList = response;
          resolve(response);
        }, reject);
    });
  }
  //getting deparments
  department(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/department/company/' + this.userService.companyId)
        .subscribe((response: any) => {
          this.departmentList = response;
          resolve(response);
        }, reject);
    });
  }
  //image upload
  fileEvent(fileInput: any) {
    this.spinnerSerivce.show();
    let windows: any = window;
    let AWSService = windows.AWS;
    let file = fileInput.target.files[0];
    let fileExt = file.name.substr(file.name.lastIndexOf('.') + 1);
    let fileName = file.name.replace("." + fileExt, '');
    AWSService.config.accessKeyId = Url.AWS_AccessKeyId;
    AWSService.config.secretAccessKey = Url.AWS_SecretAccessKey;
    AWSService.config.region = Url.AWS_BucketRegion;
    let bucket = new AWSService.S3({ params: { Bucket: Url.AWS_BucketName } });
    let params = { Key: fileName + new Date().getTime() + '.' + fileExt, Body: file };
    let fileEveThis = this;
    bucket.upload(params, function (error, response) {
      // console.log(response.Location);
      fileEveThis.employeeDetails.employeeImage = response.Location;
      this.spinnerSerivce.hide();
    });
  }
  datepickerHelpers: any = DATEPICKER_HELPERS;
}