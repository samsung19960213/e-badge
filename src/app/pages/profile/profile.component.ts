import { Component, OnInit, Inject } from '@angular/core';
import { Url } from '../../Url';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { EmployeeDetails } from '../../employees/employee.model';
import { EmployeesService } from '../../employees/employees.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';
import { PasswordDetails } from '../pages.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: number
  user: FormGroup;

  employeeDetails: any;
  empId: number

  attendance: any[] = [];
  color: any[] = [];
  dates: any[] = [];
  empID: number;
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth();
  shiftList: any;
  departmentList: any;
  designationList: any;
  RoleList:any;
  managerList: any;
  reportingMgr: any;
  firstDay = new Date(this.year, this.month, 1);
  lastDay = new Date(this.year, this.month + 1, 0);
  startDate: string;
  endDate: string;

  constructor(private http: HttpClient, public empService: EmployeesService, public dialog: MatDialog, public userService: UserService, public snackBar: MatSnackBar, public router: Router) {
    this.employeeDetails = new EmployeeDetails();
  }

  ngOnInit() {

    this.userId = this.userService.getuserId();
    this.department();
    this.designation();
    this.shift();
    this.userRole();

    this.getDetails(this.userId);
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
      userPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

  }
  getDetails(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/employee/user/' + id)
        .subscribe((response: any) => {
          resolve(response);
          this.employeeDetails = response;
        }, reject);
    });
  }
  updateDetails(employeeDetails) {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + '/api/employee/save', employeeDetails)
        .subscribe((response: any) => {
          resolve(response);
          this.snackBar.open('Updated Successful', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
          // this.router.navigateByUrl('auth/dashboard');
          this.getDetails(this.userId);
        }, reject => {
          this.snackBar.open('Invalid Format', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
        });


    });
  }
  shift(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.http.get(Url.API_URL + 'api/shift/all')
        .subscribe((response: any) => {
          this.shiftList = response;
          resolve(response);
        }, reject);

    });
  }
  reportMgr(id: string): Promise<any> {
    return new Promise((resolve, reject) => {

      this.http.get(Url.API_URL + 'api/employee/getReportingManager/' + id)
        .subscribe((response: any) => {
          this.managerList = response;
          resolve(response);
        }, reject);

    });
  }
  designation(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.http.get(Url.API_URL + 'api/desigantion/all')
        .subscribe((response: any) => {
          this.designationList = response;
          resolve(response);
        }, reject);

    });
  }
  userRole(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.http.get(Url.API_URL + 'api/userrole/all')
        .subscribe((response: any) => {
          this.RoleList = response;
          resolve(response);
        }, reject);

    });
  }
  department(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.http.get(Url.API_URL + '/api/department/all')
        .subscribe((response: any) => {
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
      fileEveThis.employeeDetails.employeeImage = response.Location;
    });
  }
  changePassword() {
    this.changePasswordDialog();
  }

  changePasswordDialog(): void {
    let dialogRef = this.dialog.open(ChangePassword, {
      width: '450px',

    });
  }

}
@Component({
  selector: 'change-password',
  templateUrl: './changePassword.html',
  styleUrls: ['./profile.component.scss']
})
export class ChangePassword {
  id: number;
  userForm: FormGroup;
  changePasswordRequest: any;
  sendData = {
    email: '',
    password: '',
    newPassword: '',
    id: 0,
  }
  loginEmail: string;
  loginPassword: string;

  constructor(private http: HttpClient,
    public message: MatDialogRef<ChangePassword>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.id = this.userService.userId;
    this.loginEmail = this.userService.getuserEmail();
    this.loginPassword = this.userService.getuserPassword();
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
  closeMessage(): void {
    this.message.close();
  }
  onSubmit(form: NgForm) {
    this.changePasswordRequest = form.value;
    if (this.changePasswordRequest.newPassword == this.changePasswordRequest.confirmPassword) {
      return new Promise((resolve, reject) => {
        this.http.post(Url.API_URL + 'api/user/changePassword', this.changePasswordRequest)
          .subscribe((response: any) => {
            resolve(response);
          }, reject);
        this.snackBar.open('Password changed Successful', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
        });
        this.message.close();
      });
    }
    else {
      this.snackBar.open('Passwords do not match', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
      });

    }
  }


}