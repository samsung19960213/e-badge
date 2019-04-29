import { Injectable } from "@angular/core";

@Injectable()
export class OfficeService {

    departmentId: number;
    designationId:number;
    shiftId:number;
    leaveId:number;
    holidayId:number;
    userId:number;
    constructor() { }
    setdepartmentId(dpid: number) {
        this.departmentId = dpid;
    }
    getdeparmentId() {
        return this.departmentId;
    }
    setdesignationId(dsid: number) {
        this.designationId = dsid;
    }
    getdesignationId() {
        return this.designationId;
    }
    setShiftId(sid: number) {
        this.shiftId = sid;
    }
    getShiftId() {
        return this.shiftId;
    }
    setLeaveId(lid: number) {
        this.leaveId = lid;
    }
    getLeaveId() {
        return this.leaveId;
    }
    setHolidayId(hid: number) {
        this.holidayId = hid;
    }
    getHolidayId() {
        return this.holidayId;
    }
    setUserId(uid: number) {
        this.userId = uid;
    }
    getUserId() {
        return this.userId;
    }
}