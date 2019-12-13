import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Leave } from './leave.model';
import { UserService } from '../../user.service';
import { Url } from '../../Url';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  leaveRequest: FormGroup;
  dataSource: any;
  LeaveArray: any[];
  companyId: number;
  empcheck = 'false';
  employeeId: number;
  empArray: any[];
  today:any;
  roleId:number;

  constructor(public form: FormBuilder, public datePipe: DatePipe,
    public http: HttpClient,
    public router: Router, public userService: UserService,
    public snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    this.dataSource = new Leave();
  }

  ngOnInit() {
    const now = new Date()

    this.today = new Date().toJSON().split('T')[0];
    console.log("date "+this.today)
    this.leaveRequest = new FormGroup({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      empType: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      leavetypeoption: new FormControl('', [Validators.required]),
      leaveType: new FormControl('', [Validators.required]),
    });
    this.companyId = this.userService.companyId;
    this.employeeId = this.userService.EmployeeID;
    this.roleId=this.userService.userroleId;
    this.EmployeeList();
    this.LeaveList();


  }

  fileName:string;
  //image upload
  fileEvent(fileInput: any) {
    let windows: any = window;
    let AWSService = windows.AWS;
    let file = fileInput.target.files[0];
    AWSService.config.accessKeyId = Url.AWS_AccessKeyId;
    AWSService.config.secretAccessKey = Url.AWS_SecretAccessKey;
    AWSService.config.region = Url.AWS_BucketRegion;
    let bucket = new AWSService.S3({ params: { Bucket: Url.AWS_BucketName_Leaves } });
    let params = { Key: file.name, Body: file };
    this.fileName=file.name;
    let fileEveThis = this;
    bucket.upload(params, function (error, response) {

      fileEveThis.dataSource.docUrl = response.Location;
    });
  }


  onChangeofOptions(newGov) {

  }
  EmployeeList(): Promise<any> {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/employee/active/' + this.employeeId)
        .subscribe((response: any) => {
          resolve(response);
          this.empArray = response;
          this.spinner.hide();
        }, reject);
    });
  }

  LeaveList(): Promise<any> {
    this.LeaveArray = [];
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leaveType/company/' + this.companyId)
        .subscribe((response: any) => {
          resolve(response);
          this.spinner.hide();
          this.LeaveArray = response;
        }, reject);

    });
  }
  join(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dataSource.fromDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');

  }
  end(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dataSource.toDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');

  }
  applyLeave() {
      if (this.empcheck === 'false')
        this.dataSource.userId = this.userService.userId;
      else {
        this.dataSource.status = "APPROVED";
        this.dataSource.actionBy = this.userService.userId
      }
      this.spinner.show();
      console.log(this.dataSource)
      return new Promise((resolve, error) => {
        this.http.post(Url.API_URL + 'api/leave/save', this.dataSource)
          .subscribe((response: any) => {
            resolve(response);
            this.spinner.hide();
            this.snackBar.open('Submitted Successfully', 'OK', {
              duration: 2000,
              verticalPosition: 'top',
            });


            this.router.navigateByUrl('auth/leaves/leave-list');

          }, (error: any) => {
            this.spinner.hide();
            this.snackBar.open('Something went wrong while sendig request', 'OK', {
              duration: 2000,
              verticalPosition: 'top',
            });
          });
      });
    
  }
}
