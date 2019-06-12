import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Url } from '../Url';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from '../leaves/leaves.service';
import { OfficeService } from '../office/office.service';

@Component({
  selector: 'app-delete-dialogue',
  templateUrl: './delete-dialogue.component.html',
  styleUrls: ['./delete-dialogue.component.scss']
})
export class DeleteDialogueComponent implements OnInit {
  deptId: number;
  private DeptArray: Array<any> = [];
  constructor(public dialogRef: MatDialogRef<DeleteDialogueComponent>, private http: HttpClient, public officeService: OfficeService) { }

  ngOnInit() {
    this.deptId = this.officeService.departmentId;
    // console.log(this.deptId);

  }
  onNoClick() {
    this.DepartmentList();
    this.dialogRef.close();
  }
  delete() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/department/delete/' + this.deptId)
        .subscribe((response: any) => {
          resolve(response);
          this.DepartmentList();
        }, reject);
      this.onNoClick();
    });


  }
  DepartmentList(): Promise<any> {
    this.DeptArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/department/all')
        .subscribe((response: any) => {
          resolve(response);
          this.DeptArray = response;
        }, reject);

    });
  }
}

