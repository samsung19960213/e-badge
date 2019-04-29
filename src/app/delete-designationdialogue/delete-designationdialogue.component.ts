import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';
import { OfficeService } from '../office/office.service';
import { Url } from '../Url';

@Component({
  selector: 'app-delete-designationdialogue',
  templateUrl: './delete-designationdialogue.component.html',
  styleUrls: ['./delete-designationdialogue.component.scss']
})
export class DeleteDesignationdialogueComponent implements OnInit {
  designationId:number;
  private DesgnArray: Array<any> = [];
  constructor(public dialogRef: MatDialogRef<DeleteDesignationdialogueComponent>,
     private http: HttpClient, public officeService: OfficeService) { }

  ngOnInit() {
    this.designationId = this.officeService.getdesignationId();
    console.log(this.designationId);
    
  }
  onNoClick() {
    this.DesignationList();
    this.dialogRef.close();
  }
  deleteDesignation() {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/desigantion/delete/' + this.designationId)
        .subscribe((response: any) => {
          resolve(response);
          this.DesignationList();
        }, reject);
      this.onNoClick();
     
    });
  }
  DesignationList(): Promise<any> {
    this.DesgnArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/desigantion/all')
        .subscribe((response: any) => {
          resolve(response);
          this.DesgnArray = response;
        }, reject);

    });
  }
}