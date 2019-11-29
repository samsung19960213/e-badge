export class WorkFromHome {
    id: number;
    requestedUserId: number;
    requestFromDate: string;
    requestToDate: string;
    reason: string;
    status: string;
    actionBy: number;
    docUrl:string;
    constructor(workFromHome?) {
        workFromHome = workFromHome || {};
        this.status = workFromHome.status || '';
        this.actionBy = workFromHome.actionBy || '';
        this.id = workFromHome.id || null;
        this.reason = workFromHome.reason || '';
        this.requestFromDate = workFromHome.requestFromDate || '';
        this.requestToDate = workFromHome.requestToDate || '';
        this.requestedUserId = workFromHome.requestedUserId || null;
        this.docUrl=workFromHome.docUrl ||'';
    }
}