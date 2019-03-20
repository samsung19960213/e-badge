import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Url } from '../Url';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from '../leaves/leaves.service';

@Component({
  selector: 'app-delete-dialogue',
  templateUrl: './delete-dialogue.component.html',
  styleUrls: ['./delete-dialogue.component.scss']
})
export class DeleteDialogueComponent implements OnInit {
  deptId: number;
  constructor(public dialogRef: MatDialogRef<DeleteDialogueComponent>, private http: HttpClient, public leaveService: LeaveService) { }

  ngOnInit() {
    this.deptId = this.leaveService.departmentId;
    console.log(this.deptId);

  }
  onNoClick() {
    this.dialogRef.close();
  }
  delete() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/department/delete/' + this.deptId)
        .subscribe((response: any) => {
          resolve(response);

        }, reject);
        this.onNoClick();
    });
    
     
    }
  }

