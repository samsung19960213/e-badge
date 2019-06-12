import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OfficeService } from '../office/office.service';
import { HttpClient } from '@angular/common/http';
import { Url } from '../Url';

@Component({
  selector: 'app-delete-shift-dialogue',
  templateUrl: './delete-shift-dialogue.component.html',
  styleUrls: ['./delete-shift-dialogue.component.scss']
})
export class DeleteShiftDialogueComponent implements OnInit {
  shiftId: number;
  private ShiftArray: Array<any> = [];
  constructor(public dialogRef: MatDialogRef<DeleteShiftDialogueComponent>,
    private http: HttpClient, public officeService: OfficeService) { }

  ngOnInit() {
    this.shiftId = this.officeService.getShiftId();
    // console.log(this.shiftId);

  }
  onNoClick() {
    this.ShiftList();
    this.dialogRef.close();
  }
  delete() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/shift/delete/' + this.shiftId)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
      this.ShiftList();
      this.onNoClick();
    });
  }
  ShiftList(): Promise<any> {
    this.ShiftArray = []
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/shift/all')
        .subscribe((response: any) => {
          resolve(response);
          this.ShiftArray = response;
        }, reject);

    });
  }
}

