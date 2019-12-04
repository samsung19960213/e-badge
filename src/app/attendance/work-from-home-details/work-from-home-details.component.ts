import { Component, OnInit, Inject } from '@angular/core';
import { Url } from '../../Url';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LeaveService } from '../../leaves/leaves.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WorkDetail } from './workDetail.model';
import { UserService } from '../../user.service';
import { Location } from '@angular/common';


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

  statusSelected = 1;
  rejectReason = '';

  constructor(public form: FormBuilder,
    public leaveService: LeaveService,
    public http: HttpClient,
    public dialog: MatDialog,
    public datePipe: DatePipe,
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public snackBar: MatSnackBar,
    private location: Location) {
    this.dataSource = new WorkDetail();
  }
  ngOnInit() {
    this.id = this.leaveService.getWorkId();
    this.getDetails(this.id);
    this.user = new FormGroup({
      employeeCode: new FormControl({ value: '', disabled: true }),
      name: new FormControl({ value: '', disabled: true }),
      designation: new FormControl({ value: '', disabled: true }),
      date: new FormControl({ value: '', disabled: true }),
      status: new FormControl({ value: '', disabled: true }),
      comments: new FormControl({ value: '', disabled: true }),
      checkIn: new FormControl({ value: '', disabled: true }),
      checkOut: new FormControl({ value: '', disabled: true }),
      reason: new FormControl({ value: '', disabled: true }),
    });
  }

  getDetails(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/attendance/workfromhome/' + id)
        .subscribe((response: any) => {
          resolve(response);
          this.dataSource = response;
        }, reject);
    });
  }

  returnBack(){
    if(this.leaveService.prevPage === 'immediate/work-from-home'){
      this.leaveService.setPrevPage("");
      this.router.navigateByUrl('auth/attendance/immediate/work-from-home');
    }
    else if(this.leaveService.prevPage === 'work-from-home'){
      this.leaveService.setPrevPage("");
      this.router.navigateByUrl('auth/attendance/work-from-home');
    }
  }

  submitResponse(dataSource) {
    console.log(dataSource)
    return new Promise((resolve, reject) => {
      if (this.statusSelected == 1) {
        this.dataSource.rejectReason = null;
      }
      this.dataSource.approvedUserId = this.userService.EmployeeID;
      this.http.post(Url.API_URL + 'api/attendance/workfromhome/approve?approve=' + this.statusSelected, this.dataSource)
        .subscribe((response: any) => {
          resolve(response);
          this.snackBar.open('Work From Home Request ' + (this.statusSelected == 1 ? 'Aprroved' : 'Rejected'), 'OK', {
            duration: 2000,
            verticalPosition: 'top',
          });
          this.router.navigateByUrl('auth/attendance/work-from-home');
        }, reject);
      this.getDetails(this.id);
    });
  }

  goBack() {
    this.location.back();
  }  
}
