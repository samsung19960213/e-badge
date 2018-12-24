import { Injectable } from "@angular/core";

@Injectable()
export class LeaveService {

    leaveId: number;
    constructor(){}
    setLeaveId(id: number) {
    this.leaveId = id;
    }
    
    getLeaveId() {
        return this.leaveId;
    }
    
}