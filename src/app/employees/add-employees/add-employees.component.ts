import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';
import { EmployeeDetails } from '../employee.model';
import "aws-sdk/dist/aws-sdk.min";
import { MatDatepickerInputEvent } from '@angular/material';
import { DATEPICKER_HELPERS } from '../../material-widgets/datepicker/helpers.data';



@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss']
})
export class AddEmployeesComponent implements OnInit {

  userForm: FormGroup;
  employeeDetails: any;
  shiftDetails: any;
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
  constructor(private http: HttpClient,public formBuilder:FormBuilder) {
    this.employeeDetails = new EmployeeDetails();
    
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      useractive:  ['', [Validators.required]],
      useraddressLine1:  ['', [Validators.required]],
      useraddressLine2:  ['', [Validators.required]],
      //userage: ['', [Validators.required,Validators.max(100), Validators.min(0)]],
      useralternateContactNo:  ['', [Validators.required]],
      userbloodGroup: ['', [Validators.required]],
      usercity:  ['', [Validators.required]],
      usercontactEmail:  ['', [Validators.required,Validators.email]],
      usercountry:  ['', [Validators.required]],
      userdateOfBirth: ['', [Validators.required]],
      userdepartmentId:  ['', [Validators.required]],
      //userdepartmentName:  ['', [Validators.required]],
      userdesignationId:  ['', [Validators.required]],
      //userdesignationName: ['', [Validators.required]],
      userdistict:  ['', [Validators.required]],
      useremployeeCode:  ['', [Validators.required]],
      //useremployeeImage: ['', [Validators.required]],
      userfirstName:  ['', [Validators.required,Validators.maxLength(25)]],
      userformerComapnyJoinDate: ['', [Validators.required]],
      userformerCompanyEndDate: ['', [Validators.required]],
      userformerCompanyName:  ['', [Validators.required]],
      usergender:  ['', [Validators.required]],
      //userid:  ['', [Validators.required]],
      userisUser: ['', [Validators.required]],
      userjoiningDate:  ['', [Validators.required]],
      userlandmark:  ['', [Validators.required]],
      userlastName:  ['', [Validators.required]],
      usermedicalInfo: ['', [Validators.required]],
      usermobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      userpincode:  ['', [Validators.required,Validators.maxLength(6)]],
      userqualification: ['', [Validators.required]],
      userstate:  ['', [Validators.required]],
      useruserRoleId:  ['', [Validators.required]],
      userworkExperince:  ['', [Validators.required]],
      usersalary:  ['', [Validators.required]],
      usershiftId: ['', [Validators.required]],
      userreportingManagerId: ['', [Validators.required]],
      
      
    });
  }
  saveDetails(employeeDetails: EmployeeDetails) {
    console.log(employeeDetails);

    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + '/api/employee/save', employeeDetails)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
      alert('success')
    });

  }
  fileEvent(fileInput: any) {
    let windows: any = window;
    let AWSService = windows.AWS;

    let file = fileInput.target.files[0];
    let region = 'Asia Pacific (Mumbai)';
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