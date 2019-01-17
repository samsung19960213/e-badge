
export class companyDetails {
  companyname:string;
  superAdminName:string;
  minimumWorkingHoursPerDay:number;
  lateEntryInterval: string;
  timeZoneOfCompany:string;
  casualLeaves:number;
  carryOnLeaves:number;
  id:number;
    
constructor(companyDetails?) {
    companyDetails = companyDetails || {};
    this.companyname= companyDetails.companyname || '';
    this.superAdminName = companyDetails.superAdminName || '';
    this.minimumWorkingHoursPerDay = companyDetails.minimumWorkingHoursPerDay || null;
    this.lateEntryInterval = companyDetails.lateEntryInterval || '';
    this.timeZoneOfCompany = companyDetails.timeZoneOfCompany || '';
    this.casualLeaves = companyDetails.casualLeaves || null;
    this.carryOnLeaves = companyDetails.carryOnLeaves || null;
    this.id = companyDetails.id|| null;
    }
}