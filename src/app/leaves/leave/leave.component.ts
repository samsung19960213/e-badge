import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Url } from '../../Url';
import { UserService } from '../../user.service';
import { DeleteLeaveDialogueComponent } from '../../delete-leave-dialogue/delete-leave-dialogue.component';
import { MatDialog } from '@angular/material';
import { OfficeService } from '../../office/office.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { companyDetails } from '../../office/office.model';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  private LeaveArray: Array<any> = [];
  private newLeave: any = {};
  dialogRef: any;
  userForm: FormGroup;
  companyDetails: any;

  constructor(private http: HttpClient,public formBuilder: FormBuilder,public officeService: OfficeService,public userService: UserService,public dialog: MatDialog,public spinner: NgxSpinnerService) {
    this.companyDetails = new companyDetails()

   }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      
      userCasualLeaves: ['', [Validators.required]],
      userCarryLeaves: ['', [Validators.required]]
     
    });
    this.LeaveList();
  }

  addLeaveValue() {
    this.LeaveArray.push(this.newLeave)
    this.saveLeave();
    this.newLeave = {};
  }

  saveLeave() {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/leaveType/save', this.LeaveArray)
        .subscribe((response: any) => {
          resolve(response);
          this.LeaveList();
          this.spinner.hide();
        }, reject => {
          this.spinner.hide();
          reject;
        });
      // this.snackBar.open('Updated Successfully', 'OK', {
      //   duration: 1000,
      //   verticalPosition: 'top',
      // });

    });
  }

  
  LeaveList(): Promise<any> {
    this.spinner.show();
    this.LeaveArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leaveType/company/' + this.userService.companyId)
        .subscribe((response: any) => {
          resolve(response);
          this.LeaveArray = response;
          this.spinner.hide();
        }, reject => {
          this.spinner.hide();
          reject;
        });

    });
  }

  deleteLeaveValue(id: number) {
    this.openLeaveDeleteDialogue();
    this.officeService.setLeaveId(id);
    // console.log(id);
  }
  openLeaveDeleteDialogue() {
    this.dialogRef = this.dialog.open(DeleteLeaveDialogueComponent, {
      width: '30%', height: '150px',
      data: {

      }
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.LeaveList();
        if (!result) {
          return;
        }

      });
  }
  closeleave(): void {
    this.closeBtn.nativeElement.click();
  }
}
