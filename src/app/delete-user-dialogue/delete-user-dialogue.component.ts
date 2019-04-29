import { Component, OnInit } from '@angular/core';
import { Url } from '../Url';
import { OfficeService } from '../office/office.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-delete-user-dialogue',
  templateUrl: './delete-user-dialogue.component.html',
  styleUrls: ['./delete-user-dialogue.component.scss']
})
export class DeleteUserDialogueComponent implements OnInit {
  userId: number;
  private RoleArray: Array<any> = [];
  constructor(public dialogRef: MatDialogRef<DeleteUserDialogueComponent>,
    private http: HttpClient,
    public officeService: OfficeService) { }

  ngOnInit() {
    this.userId = this.officeService.getUserId();
    console.log(this.userId);

  }
  onNoClick() {
    this.UserRoleList();
    this.dialogRef.close();
  }
  delete() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/userrole/delete/' + this.userId)
        .subscribe((response: any) => {
          resolve(response);
          this.UserRoleList();
        }, reject);

      this.onNoClick();
    });
  }
  UserRoleList(): Promise<any> {
    this.RoleArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/userrole/all')
        .subscribe((response: any) => {
          resolve(response);
          this.RoleArray = response;
        }, reject);

    });
  }
}

