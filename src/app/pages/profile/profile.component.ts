import { Component, OnInit, Inject } from '@angular/core';
import { Url } from '../../Url';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { EmployeeDetails } from '../../employees/employee.model';
import { EmployeesService } from '../../employees/employees.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';
import { PasswordDetails } from '../pages.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: number
  user: FormGroup;
 
  employeeDetails: any;


  constructor(private http: HttpClient, public empService: EmployeesService, public dialog: MatDialog, public userService: UserService) {
    this.employeeDetails = new EmployeeDetails();
  }

  ngOnInit() {

    this.userId = this.userService.getuserId();
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
          console.log(response);
          resolve(response);
          this.employeeDetails = response;
        }, reject);

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
  userForm:FormGroup;
  changePasswordRequest:any;
  sendData={
    email:'',
    password:'',
    newPassword:'',
    id:0,
  }
  loginEmail: string;
  loginPassword: string;

  constructor(private http: HttpClient,
    public message: MatDialogRef<ChangePassword>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, public snackBar: MatSnackBar) { }
 ngOnInit() {
   this.id=this.userService.userId;
this.loginEmail =this.userService.getuserEmail();
this.loginPassword = this.userService.getuserPassword();
console.log(this.loginPassword);
  this.userForm = new FormGroup({
    email:new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
   }
  closeMessage(): void {
    this.message.close();
  }
  onSubmit(form: NgForm) {
    console.log(form.value)
    
    this.changePasswordRequest = form.value;
    
    
    if(this.changePasswordRequest.newPassword == this.changePasswordRequest.confirmPassword){
  
    console.log(this.changePasswordRequest);
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/user/changePassword',this.changePasswordRequest )
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