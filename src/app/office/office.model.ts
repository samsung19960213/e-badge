
export class companyDetails {
  companyname:string;
  superadmin:string;
  workinghours:number;
  interval: string;
  timezone:string;
  casualleaves:number;
  carryLeaves:number;
  id:number;
    
constructor(companyDetails?) {
    companyDetails = companyDetails || {};
    this.companyname= companyDetails.companyname || '';
    this.superadmin = companyDetails.superadmin || '';
    this.workinghours = companyDetails.workinghours || null;
    this.interval = companyDetails.interval || '';
    this.timezone = companyDetails.timezone || '';
    this.casualleaves = companyDetails.casualleaves || null;
    this.carryLeaves = companyDetails.carryLeaves || null;
    this.id = companyDetails.id|| null;
    }
}