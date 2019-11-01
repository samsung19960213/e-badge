import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import "aws-sdk/dist/aws-sdk.min";
import { MatDatepickerInputEvent, MatSnackBar, MatDialog } from '@angular/material';
import { Url } from '../Url';
import { DATEPICKER_HELPERS } from '../material-widgets/datepicker/helpers.data';
import { companyDetails } from './office.model';
import { STEPPER_HELPERS } from '../material-widgets/stepper/helpers.data';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DeleteDialogueComponent } from '../delete-dialogue/delete-dialogue.component';
import { LeaveService } from '../leaves/leaves.service';
import { DeleteDesignationdialogueComponent } from '../delete-designationdialogue/delete-designationdialogue.component';
import { OfficeService } from './office.service';
import { DeleteShiftDialogueComponent } from '../delete-shift-dialogue/delete-shift-dialogue.component';
import { DeleteLeaveDialogueComponent } from '../delete-leave-dialogue/delete-leave-dialogue.component';
import { DeleteHolidayDialogueComponent } from '../delete-holiday-dialogue/delete-holiday-dialogue.component';
import { DeleteUserDialogueComponent } from '../delete-user-dialogue/delete-user-dialogue.component';
import { ThrowStmt } from '@angular/compiler';
import { UserService } from '../user.service';


@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  isLinear = true;
  userForm: FormGroup;
  companyDetails: any;
  stepperHelpers = STEPPER_HELPERS;
  // shiftDetails= new ShiftDetails();
  private DeptArray: Array<any> = [];
  private DesgnArray: Array<any> = [];
  private RoleArray: Array<any> = [];
  private ShiftArray: Array<any> = [];
  private HolidayArray: Array<any> = [];
  private LeaveArray: Array<any> = [];
  private TimeZoneArray: Array<any> = [];
  private newDept: any = {};
  private newDesgn: any = {};
  private newRole: any = {};
  private newShift: any = {};
  private newHoliday: any = {};
  private newLeave: any = {};
  dialogRef: any;
  favoriteSeason: number;
  start = new Date(2015, 6, 1);
  end = new Date(2015, 8, 1);
  day = this.start;
  getTot: number;
  yearDays: number;
  sat = new Array();   //Declaring array for inserting Saturdays
  sun = new Array();

  events: string[] = [];
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0;
  }

  workingDayFormGroup: FormGroup;
  workingDays = [{ name: 'MONDAY', checked: false }, { name: 'TUESDAY', checked: false }, { name: 'WEDNESDAY', checked: false }, { name: 'THURSDAY', checked: false }, { name: 'FRIDAY', checked: false }, { name: 'SATURDAY', checked: false }, { name: 'SUNDAY', checked: false }];

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userCompanyName: ['', [Validators.required]],
      userSuperAdmin: ['', [Validators.required]],
      userInterval: ['', [Validators.required]],
      cutOffDay: ['', [Validators.required]],
      userWorkingHours: ['', [Validators.required]],
      userTimeZone: ['', [Validators.required]],
      userCasualLeaves: ['', [Validators.required]],
      userCarryLeaves: ['', [Validators.required]]
    });

    this.TimeZone();
    this.HolidayArray = [];
    this.OfficeDetails()
    this.DepartmentList();
    this.UserRoleList();
    this.DesignationList();
    this.ShiftList();
    this.LeaveList();
    this.HolidayList();

  }

  constructor(private http: HttpClient, public formBuilder: FormBuilder, public datePipe: DatePipe, public snackBar: MatSnackBar, public router: Router, public dialog: MatDialog, public officeService: OfficeService, public userService: UserService) {
    this.companyDetails = new companyDetails();
  }
  // Temp value to store the days selected
  OfficeDetails(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/office/company/'+this.userService.companyId)
        .subscribe((response: any) => {
          resolve(response);
          this.companyDetails = response;
          const selDays: String = this.companyDetails.workingDays != undefined ? this.companyDetails.workingDays.toString() : '';
          this.workingDays.forEach(item => {
            item.checked = selDays.includes(item.name) ? true : false;
          });
        }, reject);

    });
  }
  Weekends() {
    var d = new Date();
    this.yearDays = this.daysInMonth(d.getFullYear());

    for (var i = 1; i <= this.yearDays; i++) {    //looping through days in month
      var newDate = new Date(d.getFullYear(), d.getMonth(), i)
      if (newDate.getDay() == 0) {   //if Sunday
        this.sun.push(this.datePipe.transform(newDate, 'yyyy-MM-dd'));
      }
      if (newDate.getDay() == 6) {   //if Saturday
        this.sat.push(this.datePipe.transform(newDate, 'yyyy-MM-dd'));
      }
    }
  }
  

  daysInMonth(year) {
    var year1 = 0;
    for (let i = 0; i < 12; i++) {
      //  console.log(new Date(year,i, 0).getDate());
      var month = new Date(year, i, 0).getDate();
      year1 = year1 + month;
    }
    return year1;
  }
  addLeaveValue() {
    this.LeaveArray.push(this.newLeave)
    this.saveLeave();
    this.newLeave = {};
  }
  addDepartmentValue() {
    this.DeptArray.push(this.newDept)
    this.saveDepartment();
    this.newDept = {};
  }
  addDesignationValue() {
    this.DesgnArray.push(this.newDesgn)
    this.saveDesignation();
    this.newDesgn = {};
  }
  addUserRole() {
    this.RoleArray.push(this.newRole)
    this.saveRole();
    this.newRole = {};
  }
  addShiftDetails() {
    this.ShiftArray.push(this.newShift)
    this.saveShift();
    this.newShift = {};
  }
  addHoliday() {
    this.newHoliday.leaveDate = this.datePipe.transform(this.newHoliday.leaveDate, 'yyyy-MM-dd')
    this.HolidayArray.push(this.newHoliday);
    this.saveHoliday(this.HolidayArray);
    this.newHoliday = {};
  }
  saveDepartment() {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/department/save', this.DeptArray)
        .subscribe((response: any) => {
          resolve(response);
          this.DepartmentList();
        }, reject);

    });
  }
  saveRole() {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/userrole/save', this.RoleArray)
        .subscribe((response: any) => {
          resolve(response);
          this.UserRoleList();
        }, reject);
      //setTimeout(function(){

      // }, 3000);
    });
  }
  saveLeave() {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/leaveType/save', this.LeaveArray)
        .subscribe((response: any) => {
          resolve(response);
          this.LeaveList();
        }, reject);
      // this.snackBar.open('Updated Successfully', 'OK', {
      //   duration: 1000,
      //   verticalPosition: 'top',
      // });

    });
  }
  saveDesignation() {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/desigantion/save', this.DesgnArray)
        .subscribe((response: any) => {
          resolve(response);
          this.DesignationList();
        }, reject);
    });
  }
  saveShift() {
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/shift/save', this.ShiftArray)
        .subscribe((response: any) => {
          resolve(response);
          this.ShiftList();
        }, reject);
    });
  }
  saveHoliday(holidayarray: any[]) {
    //console.log(holidayarray);
    return new Promise((resolve, reject) => {
      this.http.post(Url.API_URL + 'api/leaveDates/save', holidayarray)
        .subscribe((response: any) => {
          resolve(response);
          this.HolidayList();
        }, reject);
      //this.HolidayArray=[];
    });
  }
  saveAll() {
    this.saveDesignation();
    this.saveDepartment();
    this.saveRole();

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
  

  getWorkingDays() {
    const selValues = [];
    this.workingDays.forEach(day => {
      if (day.checked === true) {
        selValues.push(day.name);
      }
    });
    return selValues.toString();
  }

  saveDetails(companyDetails: companyDetails) {
    this.companyDetails.workingDays = this.getWorkingDays();
    console.log(this.companyDetails.workingDays);
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
    this.saveHoliday(this.HolidayArray);
    this.saveLeave();
    this.saveShift();
    this.snackBar.open('Saved Successful', 'OK', {
      duration: 2000,
      verticalPosition: 'top',
    });
    this.router.navigateByUrl('auth/dashboard');
  }
  DepartmentList(): Promise<any> {
    this.DeptArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/department/company/'+this.userService.companyId)
        .subscribe((response: any) => {
          resolve(response);
          this.DeptArray = response;
        }, reject);

    });
  }
  TimeZone(): Promise<any> {
    this.DeptArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(' http://api.timezonedb.com/v2.1/list-time-zone?key=8VO0UB9Z3CHK&format=json')
        .subscribe((response: any) => {
          resolve(response);
          this.TimeZoneArray = response.zones;
        }, reject);

    });
  }

  LeaveList(): Promise<any> {
    this.LeaveArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leaveType/company/'+this.userService.companyId)
        .subscribe((response: any) => {
          resolve(response);
          this.LeaveArray = response;
        }, reject);

    });
  }
  ShiftList(): Promise<any> {
    this.ShiftArray = []
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/shift/company/'+this.userService.companyId)
        .subscribe((response: any) => {
          resolve(response);
          this.ShiftArray = response;
        }, reject);

    });
  }
  DesignationList(): Promise<any> {
    this.DesgnArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/desigantion/company/'+this.userService.companyId)
        .subscribe((response: any) => {
          resolve(response);
          this.DesgnArray = response;
        }, reject);

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
  HolidayList(): Promise<any> {
    this.HolidayArray = [];
    return new Promise((resolve, reject) => {
      this.http.get(Url.API_URL + 'api/leaveDates/company/'+this.userService.companyId)
        .subscribe((response: any) => {
          resolve(response);
          for (var i = 0; i < response.length; i++) {
            if (response[i].leaveName != 'Weekend')
              this.HolidayArray.push(response[i]);
          }
        }, reject);

    });
  }
  deleteDepartmentValue(id: number) {
    this.openDeleteDialogue();
    this.officeService.setdepartmentId(id);
    // console.log(id);

  }
  openDeleteDialogue() {
    this.dialogRef = this.dialog.open(DeleteDialogueComponent, {
      width: '30%', height: '150px',
      data: {

      }
    });
    this.dialogRef.afterClosed()

      .subscribe(result => {
        this.DepartmentList();
        if (!result) {
          return;
        }
      });

  }
  closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  datepickerHelpers: any = DATEPICKER_HELPERS;

  deleteDesignationValue(id: number) {
    this.openDesignationDeleteDialogue();
    this.officeService.setdesignationId(id);
    // console.log(id);
  }
  openDesignationDeleteDialogue() {
    this.dialogRef = this.dialog.open(DeleteDesignationdialogueComponent, {
      width: '30%', height: '150px',
      data: {

      }
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.DesignationList();
        if (!result) {
          return;
        }

      });
  }
  closeDesignation(): void {
    this.closeBtn.nativeElement.click();
  }
  deleteShiftValue(id: number) {
    this.openShiftDeleteDialogue();
    this.officeService.setShiftId(id);
    // console.log(id);
  }
  openShiftDeleteDialogue() {
    this.dialogRef = this.dialog.open(DeleteShiftDialogueComponent, {
      width: '30%', height: '150px',
      data: {

      }
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.ShiftList();
        if (!result) {
          return;
        }

      });
  }
  closeShift(): void {
    this.closeBtn.nativeElement.click();
  }
  deleteLeaveValue(id: number) {
    this.openLeaveDeleteDialogue();
    this.officeService.setLeaveId(id);
    // console.log(id);
  }
  openLeaveDeleteDialogue() {
    this.dialogRef = this.dialog.open(DeleteLeaveDialogueComponent, {
      width: '30%', height: '150px',
      data: {

      }
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.LeaveList();
        if (!result) {
          return;
        }

      });
  }
  closeleave(): void {
    this.closeBtn.nativeElement.click();
  }
  deleteHolidayValue(id: number) {
    this.openHolidayDeleteDialogue();
    this.officeService.setHolidayId(id);
    // console.log(id);
  }
  openHolidayDeleteDialogue() {
    this.dialogRef = this.dialog.open(DeleteHolidayDialogueComponent, {
      width: '30%', height: '150px',
      data: {

      }
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.HolidayList();
        if (!result) {
          return;
        }

      });
  }
  closeHoliday(): void {
    this.closeBtn.nativeElement.click();
  }
  deleteUserRoleValue(id: number) {
    this.openUserDeleteDialogue();
    this.officeService.setUserId(id);
    // console.log(id);
  }
  openUserDeleteDialogue() {
    this.dialogRef = this.dialog.open(DeleteUserDialogueComponent, {
      width: '30%', height: '150px',
      data: {

      }
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.UserRoleList();
        if (!result) {
          return;
        }

      });
  }
  closeUser(): void {
    this.closeBtn.nativeElement.click();
  }

  //image upload
  fileEvent(fileInput: any) {
    let windows: any = window;
    let AWSService = windows.AWS;
    let file = fileInput.target.files[0];
    AWSService.config.accessKeyId = Url.AWS_AccessKeyId;
    AWSService.config.secretAccessKey = Url.AWS_SecretAccessKey;
    AWSService.config.region = Url.AWS_BucketRegion;
    let bucket = new AWSService.S3({ params: { Bucket: Url.AWS_BucketName } });
    let params = { Key: file.name, Body: file };
    let fileEveThis = this;
    bucket.upload(params, function (error, response) {
      // console.log(response.Location);
      fileEveThis.companyDetails.cmpLogoUrl = response.Location;
    });
  }
}
