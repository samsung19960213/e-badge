import { Component, OnInit, Inject } from '@angular/core';
import { Url } from '../../Url';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LeaveService } from '../../leaves/leaves.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WorkDetail } from './workDetail.model';

@Component({
  selector: 'app-work-from-home-details',
  templateUrl: './work-from-home-details.component.html',
  styleUrls: ['./work-from-home-details.component.scss']
})
export class WorkFromHomeDetailsComponent implements OnInit {
  id: number;
  user: FormGroup;
  checkOutTime: string;
  checkInTime: string;
  comments: string;
  date: string;
  status: string;
  flag: number;
  dataSource: any;
  constructor(public form: FormBuilder,
    public leaveService: LeaveService,
    public http: HttpClient,
    public dialog: MatDialog,
    public datePipe: DatePipe,
    public route: ActivatedRoute,
    public router: Router,
    public snackBar: MatSnackBar) {
    this.dataSource = new WorkDetail();
  }
  ngOnInit() {
    this.id = this.leaveService.getWorkId();
    this.getDetails(this.id);
    this.user = new FormGroup({
      employeeCode: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required]),
      checkIn: new FormControl('', [Validators.required]),
      checkOut: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
    });
  }

  getDetails(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/attendance/workfromhome/' + id)
        .subscribe((response: any) => {
          resolve(response);
          this.dataSource = response;
        }, reject);
    });
  }

  accept(dataSource) {
    dataSource.flag == 1;
    return new Promise((resolve, reject) => {
      const approveDto = {
        'checkOutTime': dataSource.checkOutTime,
        'checkInTime': dataSource.checkInTime,
        'flag': 1,
        'date': dataSource.date,
        'id': dataSource.id
      };
      this.http.post(Url.API_URL + '/api/attendance/adminupdateworkfromhome', approveDto)
        .subscribe((response: any) => {
          resolve(response);
          this.snackBar.open('Work From Home Aprroved', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.router.navigateByUrl('auth/attendance/work-from-home');
        }, reject);
      this.getDetails(this.id);
    });
  }
  reject() {
    this.message();
  }
  message(): void {
    let dialogRef = this.dialog.open(RejectAlert, {
      width: '400px',

    });
  }
}



@Component({
  selector: 'reject-alert',
  templateUrl: './rejectAlert.html',
  styleUrls: ['./work-from-home-details.component.scss']
})

export class RejectAlert {
  id: number;
  reason: string;
  dataSource: any;

  constructor(private http: HttpClient,
    public message: MatDialogRef<RejectAlert>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public leaveService: LeaveService,
    public router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.leaveService.getWorkId();
    this.getDetails(this.id);
  }

  closeMessage(): void {
    this.message.close();
  }
  //rejecting the request
  rejectRequest(dataSource) {
    return new Promise((resolve, reject) => {
      const rejectDto = {
        'checkOutTime': this.dataSource.checkOutTime,
        'checkInTime': this.dataSource.checkInTime,
        'flag': 0,
        'reason': this.reason,
        'date': this.dataSource.date,
        'id': this.dataSource.id
      };
      this.http.post(Url.API_URL + '/api/attendance/adminupdateworkfromhome', rejectDto)
        .subscribe((response: any) => {
          resolve(response);
          this.snackBar.open('Work From Home Rejected', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.router.navigateByUrl('auth/attendance/work-from-home');
        }, reject
        );
      this.message.close();
      this.getDetails(this.id);

    });
  }
  getDetails(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/attendance/attendanceid/' + id)
        .subscribe((response: any) => {
          resolve(response);
          this.dataSource = response;
        }, reject);
    });
  }
}
