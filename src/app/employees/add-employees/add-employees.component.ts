import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmployeeDetails } from './employee.model';
import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss']
})
export class AddEmployeesComponent implements OnInit {

  user: FormGroup;
  employeeDetails: any;


  constructor(private http: HttpClient) {
    this.employeeDetails = new EmployeeDetails();
  }

  ngOnInit() {
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

}