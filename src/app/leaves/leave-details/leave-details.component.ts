import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LeaveService } from '../leaves.service';

import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Leave } from './leave.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss']
})
export class LeaveDetailsComponent implements OnInit {
  id: number;
  user: FormGroup;

  dataSource: any;
  constructor(public form: FormBuilder,public spinner:NgxSpinnerService,
    public leaveService: LeaveService,
    public http: HttpClient,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar) {
    this.dataSource = new Leave();
  }
  ngOnInit() {
    this.id = this.leaveService.getLeaveId();
    this.getDetails(this.id);
    this.user = new FormGroup({
      id: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      availableLeaves: new FormControl('', [Validators.required]),
      requestTime: new FormControl('', [Validators.required]),
      leaveType: new FormControl('', [Validators.required]),
      rejectReason: new FormControl(''),
    });

  }

  returnBack(){
    if(this.leaveService.prevPage === 'pending-leaves'){
      this.leaveService.setPrevPage("");
      this.router.navigateByUrl('auth/leaves/pending-leaves');
    }
    else if(this.leaveService.prevPage === 'leave-list'){
      this.leaveService.setPrevPage("");
      this.router.navigateByUrl('auth/leaves/leave-list');
    }else{
      this.router.navigateByUrl('auth/leaves/pending-leaves');
    }
  }

  getDetails(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leave/' + id)
        .subscribe((response: any) => {
          resolve(response);
          this.dataSource = response;
        }, reject);
    });
  }
  accept() {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leave/admin/' + this.id + '/true')
        .subscribe((response: any) => {
          resolve(response);
          this.spinner.hide();

          this.snackBar.open('Leave Approved', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.router.navigateByUrl('auth/leaves/leave-list');

        }, reject);
        this.spinner.hide();

      this.getDetails(this.id);
    });
  }

  reject() {
    this.message();
  }

  message(): void {
    let dialogRef = this.dialog.open(RejectPopup, {
      width: '400px',

    });
  }
}
@Component({
  selector: 'reject-popup',
  templateUrl: './rejectPopup.html',
  styleUrls: ['./leave-details.component.scss']
})

export class RejectPopup {
  id: number;
  reason: string;
  dataSource
  constructor(private http: HttpClient,public spinner:NgxSpinnerService,
    public message: MatDialogRef<RejectPopup>, @Inject(MAT_DIALOG_DATA) public data: any, public leaveService: LeaveService, public router: Router, public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.id = this.leaveService.getLeaveId();
    this.getDetails(this.id);
  }
  closeMessage(): void {
    this.message.close();
  }
  getDetails(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leave/' + id)
        .subscribe((response: any) => {
          resolve(response);
          this.dataSource = response;
        }, reject);

    });

  }
  rejectLeave() {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leave/admin/' + this.id + '/false?rejectReason=' + this.reason)
        .subscribe((response: any) => {
          resolve(response);
          this.spinner.hide();

          this.snackBar.open('Leave Rejected', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.router.navigateByUrl('auth/leaves/leave-list');
        }, reject
        );
        this.spinner.hide();

      this.message.close();
      this.getDetails(this.id);
    });
  }
}