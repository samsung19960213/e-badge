import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import "aws-sdk/dist/aws-sdk.min";
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { Url } from '../Url';
import { DATEPICKER_HELPERS } from '../material-widgets/datepicker/helpers.data';
import { companyDetails } from './office.model';
import { STEPPER_HELPERS } from '../material-widgets/stepper/helpers.data';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  isLinear = true;
  userForm: FormGroup;
  companyDetails: any;
  stepperHelpers = STEPPER_HELPERS;
  // shiftDetails= new ShiftDetails();
  private DeptArray: Array<any> = [];
  private DesgnArray: Array<any> = [];
  private ShiftArray: Array<any> = [];
  private HolidayArray: Array<any> = [];
  private LeaveArray: Array<any> = [];
  private newDept: any = {};
private newDesgn: any = {};
private newShift: any = {};
private newHoliday:any= {};
private newLeave:any={};
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
    this.OfficeDetails()
    this.DepartmentList();
    this.DesignationList();
    this.ShiftList();
    this.LeaveList();
    this.HolidayList();
    // this.Weekends();
    
  
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
 OfficeDetails(): Promise<any> {

  return new Promise((resolve, reject) => {
    this.http.get(Url.API_URL + 'api/office/all')
    .subscribe((response: any) => {
      resolve(response);
      this.companyDetails=response[0];
      console.log(this.companyDetails);
     
    },reject);
   
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
//    this.newHoliday={};
   
//  }
//  console.log(this.HolidayArray);
//  this.saveHoliday(this.HolidayArray);
 
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
addLeaveValue() {
  this.LeaveArray.push(this.newLeave)
  console.log(this.LeaveArray);
  this.saveLeave();
  this.newLeave = {};
}
  addDepartmentValue() {
      this.DeptArray.push(this.newDept)
      console.log(this.DeptArray);
      this.saveDepartment();
      this.newDept = {};
  }
  addDesignationValue() {
    this.DesgnArray.push(this.newDesgn)
    console.log(this.DesgnArray);
    this.saveDesignation();
    this.newDesgn = {};
 }
 addShiftDetails() {
  this.ShiftArray.push(this.newShift)
  console.log(this.ShiftArray);
  this.saveShift();
  this.newShift = {};
}
  addHoliday() {
    this.newHoliday.leaveDate=this.datePipe.transform(this.newHoliday.leaveDate, 'yyyy-MM-dd')
    this.HolidayArray.push(this.newHoliday);
    console.log(this.HolidayArray);
    this.saveHoliday(this.HolidayArray);
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
  saveLeave() {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/leaveType/save', this.LeaveArray)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
      console.log('success');
      setTimeout(function(){
      this.LeaveList();
        }, 3000);
    });
  }
  saveDesignation() {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/desigantion/save', this.DesgnArray)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
      console.log('success');
      setTimeout(function(){
      this.DesignationList();
        }, 3000);
    });
  }
  saveShift() {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + '/api/shift/save', this.ShiftArray)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
      console.log('success');
      setTimeout(function(){
      this.ShiftList();
        }, 3000);
    });
  }
 saveHoliday( holidayarray: any[]) {
console.log(holidayarray);
  return new Promise((resolve, reject) => {
    this.http.post(Url.API_URL + 'api/leaveDates/save', holidayarray)
      .subscribe((response: any) => {
        resolve(response);
      }, reject);
    console.log('success');
    this.HolidayArray=[];
    setTimeout(function(){
    this.HolidayList();
      }, 3000);

  });
  
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
  constructor(private http: HttpClient, public formBuilder: FormBuilder, public datePipe: DatePipe, public snackBar: MatSnackBar, public router: Router) {
    this.companyDetails = new companyDetails();
  }
  
 
  saveDetails(companyDetails: companyDetails) {
    console.log(companyDetails);

    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/office/save', companyDetails)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    
      this.snackBar.open('Saved Successful', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
      });
    });
    

  }
  Office() {
    this.snackBar.open('Saved Successful', 'OK', {
      duration: 2000,
      verticalPosition: 'top',
    });
  
    this.router.navigateByUrl('auth/dashboard');
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
  LeaveList(): Promise<any> {
    this.LeaveArray=[];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + '/api/leaveType/all')
      .subscribe((response: any) => {
        resolve(response);
        this.LeaveArray=response;
       
      },reject);
     
    });
  }
  ShiftList(): Promise<any> {
    this.ShiftArray=[]
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/shift/all')
      .subscribe((response: any) => {
        resolve(response);
        this.ShiftArray=response;
       console.log(this.ShiftArray);
      },reject);
     
    });
  }
  DesignationList(): Promise<any> {
    this.DesgnArray=[];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/desigantion/all')
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