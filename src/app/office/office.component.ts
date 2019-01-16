import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import "aws-sdk/dist/aws-sdk.min";
import { MatDatepickerInputEvent } from '@angular/material';
import { Url } from '../Url';
import { DATEPICKER_HELPERS } from '../material-widgets/datepicker/helpers.data';
import { companyDetails } from './office.model';
import { STEPPER_HELPERS } from '../material-widgets/stepper/helpers.data';
import { DatePipe } from '@angular/common';


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
  private DeptArray: Array<any> = [];
  private DesgnArray: Array<any> = [];
  private ShiftArray: Array<any> = [];
  private HolidayArray: Array<any> = [];
  private newDept: any = {};
private newDesgn: any = {};
private newShift: any = {};
private newHoliday:any= {};
favoriteSeason:number;
start=new Date(2015,6,1);
end= new Date(2015,8,1);
day = this.start;
getTot:number;
yearDays:number;
sat = new Array();   //Declaring array for inserting Saturdays
sun = new Array();

  events: string[] = [];
  myFilter = (d: Date): boolean => {
    const day = d.getDay();

    return day !== 0;
  }
  
  ngOnInit() {
    this.HolidayArray=[];
    this.DepartmentList();
    this.DesignationList();
    this.ShiftList();
    this.HolidayList();
    this.Weekends();
    
  
console.log(this.sat);
console.log(this.sun);
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
 Weekends() {
  var d = new Date();
  this.yearDays = this.daysInMonth(d.getFullYear());
  
  for(var i=1;i<=this.yearDays;i++){    //looping through days in month
   var newDate = new Date(d.getFullYear(),d.getMonth(),i)
   if(newDate.getDay()==0){   //if Sunday
     this.sun.push(this.datePipe.transform(newDate, 'yyyy-MM-dd'));
   }
   if(newDate.getDay()==6){   //if Saturday
       this.sat.push(this.datePipe.transform(newDate, 'yyyy-MM-dd'));
       
   }
 
 }
//  for(var j=0; j< this.sun.length;j++){
//    this.newHoliday.leaveDate =this.sun[j];
//    this.newHoliday.leaveName='Weekend';
//    this.HolidayArray.push(this.newHoliday);
   
//  }
//  this.saveHoliday();
//  this.HolidayArray=[];
 }
 daysInMonth(year) {
   var year1 =0;
  for(let i=0; i<12; i++){
  //  console.log(new Date(year,i, 0).getDate());
   var month = new Date(year,i,0).getDate(); 
  
    year1 = year1+  month;
   
  }
 
 return year1;
}

  addDepartmentValue() {
      this.DeptArray.push(this.newDept)
      console.log(this.DeptArray);
      this.saveDepartment();
      this.newDept = {};
  }
  addHoliday() {
    this.newHoliday.leaveDate=this.datePipe.transform(this.newHoliday.leaveDate, 'yyyy-MM-dd')
    this.HolidayArray.push(this.newHoliday);
    console.log(this.HolidayArray);
    this.saveHoliday();
    this.newHoliday ={};
   
  }
  saveDepartment() {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/department/save', this.DeptArray)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
      console.log('success');
      setTimeout(function(){
      this.DepartmentList();
        }, 3000);
    });
  }
 saveHoliday() {

  return new Promise((resolve, reject) => {
    this.http.post(Url.API_URL + 'api/leaveDates/save', this.HolidayArray)
      .subscribe((response: any) => {
        resolve(response);
      }, reject);
    console.log('success');
    setTimeout(function(){
    this.HolidayList();
      }, 3000);
  });
  
 }
  addShiftDetails() {
    this.ShiftArray.push(this.newShift)
    console.log(this.ShiftArray);
    this.newShift = {};
}

  addDesignationValue() {
    this.DesgnArray.push(this.newDesgn)
    console.log(this.DesgnArray);
    this.newDesgn = {};
 }
//   deleteFieldValue(index) {
//       this.fieldArray.splice(index, 1);
//   }
  
//   deleteFieldValue1(index) {
//     this.fieldArray1.splice(index, 1);
// }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  constructor(private http: HttpClient, public formBuilder: FormBuilder, public datePipe: DatePipe) {
    this.companyDetails = new companyDetails();
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
    this.DeptArray=[];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/department/all')
      .subscribe((response: any) => {
        resolve(response);
        this.DeptArray=response;
       
      },reject);
     
    });
  }
  ShiftList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/shift/all')
      .subscribe((response: any) => {
        resolve(response);
        this.ShiftArray=response;
       
      },reject);
     
    });
  }
  DesignationList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/desigantion/findallDesignation')
      .subscribe((response: any) => {
        resolve(response);
        this.DesgnArray=response;
      
      },reject);
     
    });
  }
  HolidayList(): Promise<any> {
    this.HolidayArray =[];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leaveDates/all')
      .subscribe((response: any) => {
        resolve(response);
        this.HolidayArray=response;
      
      },reject);
     
    });
  }
  datepickerHelpers: any = DATEPICKER_HELPERS;

}