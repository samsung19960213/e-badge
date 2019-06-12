import { Component, OnInit } from '@angular/core';
import { DeleteLeaveDialogueComponent } from '../delete-leave-dialogue/delete-leave-dialogue.component';
import { HttpClient } from '@angular/common/http';
import { OfficeService } from '../office/office.service';
import { MatDialogRef } from '@angular/material';
import { Url } from '../Url';

@Component({
  selector: 'app-delete-holiday-dialogue',
  templateUrl: './delete-holiday-dialogue.component.html',
  styleUrls: ['./delete-holiday-dialogue.component.scss']
})
export class DeleteHolidayDialogueComponent implements OnInit {
  holidayId: number;
  private HolidayArray: Array<any> = [];
  constructor(public dialogRef: MatDialogRef<DeleteLeaveDialogueComponent>,
    private http: HttpClient,
    public officeService: OfficeService) { }

  ngOnInit() {
    this.holidayId = this.officeService.getHolidayId();
    // console.log(this.holidayId);

  }
  onNoClick() {
    this.HolidayList();
    this.dialogRef.close();
  }
  delete() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leaveDates/delete/' + this.holidayId)
        .subscribe((response: any) => {
          resolve(response);
          this.HolidayList();
        }, reject);

      this.onNoClick();
    });
  }
  HolidayList(): Promise<any> {
    this.HolidayArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leaveDates/all')
        .subscribe((response: any) => {
          resolve(response);
          for (var i = 0; i < response.length; i++) {
            if (response[i].leaveName != 'Weekend')
              this.HolidayArray.push(response[i]);
          }
        }, reject);

    });
  }
}

