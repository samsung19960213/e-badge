import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfficeService } from '../office/office.service';
import { MatDialogRef } from '@angular/material';
import { Url } from '../Url';
import { LeaveService } from '../leaves/leaves.service';

@Component({
  selector: 'app-delete-leave-dialogue',
  templateUrl: './delete-leave-dialogue.component.html',
  styleUrls: ['./delete-leave-dialogue.component.scss']
})
export class DeleteLeaveDialogueComponent implements OnInit {
  leaveId: number;
  private LeaveArray: Array<any> = [];
  constructor(public dialogRef: MatDialogRef<DeleteLeaveDialogueComponent>,
    private http: HttpClient,
    public leaveService: LeaveService,
    public officeService: OfficeService) { }

  ngOnInit() {
    this.leaveId = this.officeService.getLeaveId();
    console.log(this.leaveId);

  }
  onNoClick() {
    this.LeaveList();
    this.dialogRef.close();
  }
  delete() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leaveType/delete/' + this.leaveId)
        .subscribe((response: any) => {
          resolve(response);
          this.LeaveList();
        }, reject);

      this.onNoClick();
    });
  }
  LeaveList(): Promise<any> {
    this.LeaveArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/leaveType/all')
        .subscribe((response: any) => {
          resolve(response);
          this.LeaveArray = response;
        }, reject);

    });
  }
}


