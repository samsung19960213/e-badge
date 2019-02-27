import { Injectable } from "@angular/core";

@Injectable()
export class LeaveService {

    leaveId: number;
    dateMonth= [];
    constructor() { }
    setLeaveId(id: number) {
        this.leaveId = id;
    }

    getLeaveId() {
        return this.leaveId;
    }
    setDateMonth(date= []) {
        this.dateMonth = date
    }
    getDateMonth() {
        return this.dateMonth;
    }
}