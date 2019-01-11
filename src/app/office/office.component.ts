import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import "aws-sdk/dist/aws-sdk.min";
import { MatDatepickerInputEvent } from '@angular/material';
import { Url } from '../Url';
import { DATEPICKER_HELPERS } from '../material-widgets/datepicker/helpers.data';
import { companyDetails } from './office.model';


@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  
  userForm: FormGroup;
  companyDetails: any;
  // shiftDetails= new ShiftDetails();

  events: string[] = [];
  myFilter = (d: Date): boolean => {
    const day = d.getDay();

    return day !== 0 && day !== 6;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  constructor(private http: HttpClient, public formBuilder: FormBuilder) {
    this.companyDetails = new companyDetails();
  }
  
  ngOnInit() {
   
    this.userForm = this.formBuilder.group({
      userCompanyName: ['', [Validators.required]],
      userSuperAdmin: ['', [Validators.required]],
      userInterval: ['', [Validators.required]],
      userWorkingHours: ['', [Validators.required]],
      userTimeZone: ['', [Validators.required]],
      userCasualLeaves: ['', [Validators.required]],
      userCarryLeaves: ['', [Validators.required]]
    });
    
 }
  saveDetails(companyDetails: companyDetails) {
    console.log(companyDetails);

    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/office/save', companyDetails)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
      alert('success')
    });

  }
  datepickerHelpers: any = DATEPICKER_HELPERS;

}