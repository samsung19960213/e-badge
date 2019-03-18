export class Leave {
    active: number;
    availableLeaves: number;
    description: string;
    fromDate: string;
    id: number;
    leaveType: string;
    reason: string;
    rejectReason: string;
    requestTime: string;
    status: string;
    toDate: string;
    userName: string;
    constructor(leave?) {
        leave = leave || {};
        // this.id = employeeDetails.id || null;
        this.active = leave.active || 1;
        this.availableLeaves = leave.addressLine1 || '';
        this.description = leave.description || '';
        this.id = leave.id || 1;
        this.fromDate = leave.fromDate || '';
        this.leaveType = leave.leaveType || '';
        this.reason = leave.reason || '';
        this.rejectReason = leave.rejectReason || '';
        this.status = leave.status || '';
        this.requestTime = leave.requestTime || '';
        this.toDate = leave.toDate || '';
        this.userName = leave.userName || '';
    }
}