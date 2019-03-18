export class WorkDetail {
    checkInTime: string;
    comments: string;
    date:string;
    designation: string;
    employeeCode: string;
    employeeId: number;
    firstName: string;
    id: number;
    secondName: string;
    status: string;
    constructor(WorkDetail?) {
        WorkDetail = WorkDetail || {};
        this.checkInTime = WorkDetail.checkInTime || '';
        this.comments = WorkDetail.comments || '';
        this.date = WorkDetail.date || '';
        this.id = WorkDetail.id || 1;
        this.designation = WorkDetail.designation || '';
        this.employeeCode = WorkDetail.employeeCode || '';
        this.employeeId = WorkDetail.employeeId || 1;
        this.firstName = WorkDetail.firstName || '';
        this.secondName = WorkDetail.secondName || '';
        this.status = WorkDetail.status || '';
       
    }
}