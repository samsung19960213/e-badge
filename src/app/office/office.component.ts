import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import "aws-sdk/dist/aws-sdk.min";
import { MatDatepickerInputEvent } from '@angular/material';
import { Url } from '../Url';
import { DATEPICKER_HELPERS } from '../material-widgets/datepicker/helpers.data';
import { companyDetails } from './office.model';
import { STEPPER_HELPERS } from '../material-widgets/stepper/helpers.data';


@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  isLinear = false;
  userForm: FormGroup;
  companyDetails: any;
  stepperHelpers = STEPPER_HELPERS;
  // shiftDetails= new ShiftDetails();

  events: string[] = [];
  myFilter = (d: Date): boolean => {
    const day = d.getDay();

    return day !== 0 && day !== 6;
  }
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  constructor(private http: HttpClient, public formBuilder: FormBuilder) {
    this.companyDetails = new companyDetails();
  }
  
  ngOnInit() {
    this.DepartmentList();
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
  DepartmentList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/department/all')
      .subscribe((response: any) => {
        resolve(response);
        this.fieldArray=response;
        console.log(this.fieldArray);
      },reject);
     
    });
  }
  DesignationList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/department/all')
      .subscribe((response: any) => {
        resolve(response);
        this.fieldArray=response;
        console.log(this.fieldArray);
      },reject);
     
    });
  }
  datepickerHelpers: any = DATEPICKER_HELPERS;

}