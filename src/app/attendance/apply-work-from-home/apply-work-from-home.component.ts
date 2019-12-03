import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LeaveService } from '../../leaves/leaves.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Url } from '../../Url';
import { WorkFromHome } from './workFromHome.model';

@Component({
  selector: 'app-apply-work-from-home',
  templateUrl: './apply-work-from-home.component.html',
  styleUrls: ['./apply-work-from-home.component.scss']
})
export class ApplyWorkFromHomeComponent implements OnInit {
  workFromHomeRequest: FormGroup;
  dataSource: any;
  empcheck='false';
  empArray:any[];
  employeeId:number;
  roleId:number;
  today:any;
  constructor(public form: FormBuilder,
    public leaveService: LeaveService,
    public http: HttpClient,
    public dialog: MatDialog,
    public datePipe: DatePipe,
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
    ) { 
      this.dataSource = new WorkFromHome();
  }

  ngOnInit() {
    this.roleId=this.userService.userroleId;
    this.today = new Date().toJSON().split('T')[0];

    this.workFromHomeRequest = new FormGroup({
      status: new FormControl( '',[Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl( '', [Validators.required]),
      reason: new FormControl( '', [Validators.required]),
      leavetypeoption:new FormControl('',[Validators.required]),
      empType:new FormControl('',[Validators.required]),
    });
    this.employeeId = this.userService.EmployeeID;
    this.EmployeeList();
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

  submitResponse(){
    {
        if (this.empcheck === 'false')
          this.dataSource.requestedUserId = this.userService.userId;
        else {
          this.dataSource.status = "APPROVED";
          this.dataSource.actionBy = this.userService.userId
        }
        console.log(this.dataSource)
        this.spinner.show();
        return new Promise((resolve, error) => {
          this.http.post(Url.API_URL + 'api/attendance/workfromhome/save', this.dataSource)
            .subscribe((response: any) => {
              resolve(response);
              this.spinner.hide();
              this.snackBar.open('Submitted Successfully', 'OK', {
                duration: 2000,
                verticalPosition: 'top',
              });
  
  
              this.router.navigateByUrl('auth/attendance/work-from-home');
  
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

  fileName:string;
  //image upload
  fileEvent(fileInput: any) {
    let windows: any = window;
    let AWSService = windows.AWS;
    let file = fileInput.target.files[0];
    AWSService.config.accessKeyId = Url.AWS_AccessKeyId;
    AWSService.config.secretAccessKey = Url.AWS_SecretAccessKey;
    AWSService.config.region = Url.AWS_BucketRegion;
    let bucket = new AWSService.S3({ params: { Bucket: Url.AWS_BucketName_WFH } });
    let params = { Key: file.name, Body: file };
    this.fileName=file.name;
    let fileEveThis = this;
    bucket.upload(params, function (error, response) {
      
      fileEveThis.dataSource.docUrl = response.Location;
    });
  }
}
