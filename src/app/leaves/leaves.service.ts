import { Injectable } from "@angular/core";

@Injectable()
export class LeaveService {

    leaveId: number;
    name= [];
    constructor() { }
    setLeaveId(id: number) {
        this.leaveId = id;
    }

    getLeaveId() {
        return this.leaveId;
    }
    setDateMonth(name= []) {
        this.name = name
    }
    getDateMonth() {
        return this.name;
    }
}