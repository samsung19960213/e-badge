export class Leave {
    
    description: string;
    fromDate: string;   
    leaveType: string;
    reason: string;
    toDate: string;
    userName: string;
    leaveTypeId:number;
    userId:number;
     actionBy:number;
     status:string;
     docUrl:string;
    constructor(leave?) {
        leave = leave || {};
        this.leaveTypeId=leave.leaveTypeId|| null;
        this.userId =leave.userId ||null;
        this.fromDate = leave.fromDate || '';
        this.leaveType = leave.leaveType || '';
        this.reason = leave.reason || '';
        this.toDate = leave.toDate || '';
        this.userName = leave.userName || '';
        this.actionBy=leave.actionBy || null;
        this.status=leave.status ||'';
        this.docUrl=leave.docUrl || '';
    }
}