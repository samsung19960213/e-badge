import { Injectable } from "@angular/core";

@Injectable()
export class LeaveService {

    leaveId: number;
    workId:number;
    departmentId:number;
    
    name= [];
    constructor() { }
    setLeaveId(id: number) {
        this.leaveId = id;
    }

    getLeaveId() {
        return this.leaveId;
    }
    setWorkId(id: number) {
        this.workId = id;
    }

    getWorkId() {
        return this.workId;
    }
    
    setDateMonth(name= []) {
        this.name = name
    }
    getDateMonth() {
        return this.name;
    }
    setdepartmentId(id: number) {
        this.departmentId = id;
    }

    getdeparmentId() {
        return this.departmentId;
    }
}