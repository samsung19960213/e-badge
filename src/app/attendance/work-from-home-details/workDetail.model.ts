export class WorkDetail {
    id: number;
    status: string;
	approvedUser: string;
	approvedUserId;
	createdDate: string;
	rejectReason: string;
	reason: string;
	requestFromDate: string;
	requestToDate: string;
	approvedDate: string;
	requestedUser: string;
	requestedUserCode: string;
	requestedUserId: string;

    constructor(workDetail?) {
        workDetail = workDetail || {};
        this.status = workDetail.status || '';
        this.approvedUser = workDetail.approvedUser || '';
        this.approvedUserId = workDetail.approvedUserId || '';
        this.id = workDetail.id || null;
        this.createdDate = workDetail.createdDate || '';
        this.rejectReason = workDetail.rejectReason || '';
        this.reason = workDetail.reason || 1;
        this.requestFromDate = workDetail.requestFromDate || '';
        this.requestToDate = workDetail.requestToDate || '';
        this.approvedDate = workDetail.approvedDate || '';
        this.requestedUser = workDetail.requestedUser || '';
        this.requestedUserCode = workDetail.requestedUserCode || '';
        this.requestedUserId = workDetail.requestedUserId || '';       
    }
}