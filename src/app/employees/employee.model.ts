export class EmployeeDetails {
    active: number;
    addressLine1: string;
    addressLine2: string;
    // age: number;
    alternateContactNo: string;
    bloodGroup: string;
    city: string;
    contactEmail: string;
    country: string;
    dateOfBirth: string;
    departmentId: number;
    // departmentName: string;
    designationId: number;
    // designationName: string;
    distict: string;
    // employeeCode: string;
    employeeImage: string;
    firstName: string;
    formerCompanyJoinDate: string;
    formerCompanyEndDate: string;
    formerCompanyName: string;
    gender: string;
    // id: number;
    isUser: number;
    joiningDate: string;
    landmark: string;
    lastName: string;
    medicalInfo: string;
    mobileNo: string;
    pincode: string;
    qualification: string;
    state: string;
    userRoleId: number;
    experinces: number;
    salary:number;
    shiftId:number;
    reportingManagerId:number;
    



    constructor(employeeDetails?) {
        employeeDetails = EmployeeDetails || {};
        // this.id = employeeDetails.id || null;
        this.active = employeeDetails.active || 0;
        this.addressLine1 = employeeDetails.addressLine1 || '';
        this.addressLine2 = employeeDetails.addressLine2 || '';
        this.reportingManagerId = employeeDetails.reportingManagerId || 0;
        // this.age = employeeDetails.age || 0;
        this.alternateContactNo = employeeDetails.alternateContactNo || '';
        this.bloodGroup = employeeDetails.bloodGroup || '';
        this.city = employeeDetails.city || '';
        this.contactEmail = employeeDetails.contactEmail || '';
        this.country = employeeDetails.country || '';
        this.dateOfBirth = employeeDetails.dateOfBirth || '';
        this.departmentId = employeeDetails.departmentId || 0;
        // this.departmentName = employeeDetails.departmentName || '';
        this.designationId = employeeDetails.designationId || 0;
        // this.designationName = employeeDetails.designationName || '';
        this.distict = employeeDetails.distict || '';
        // this.employeeCode = employeeDetails.employeeCode || '';
        this.employeeImage = employeeDetails.employeeImage || '';
        this.firstName = employeeDetails.firstName || '';
        this.formerCompanyJoinDate = employeeDetails.formerCompanyJoinDate || '';
        this.formerCompanyEndDate = employeeDetails.formerCompanyEndDate || '';
        this.formerCompanyName = employeeDetails.formerCompanyName || '';
        this.gender = employeeDetails.gender || '';
        
        this.isUser = employeeDetails.isUser || 0;
        this.joiningDate = employeeDetails.joiningDate || '';
        this.landmark = employeeDetails.landmark || '';
        this.lastName = employeeDetails.lastName || '';
        this.medicalInfo = employeeDetails.medicalInfo || '';
        this.mobileNo = employeeDetails.mobileNo || '';
        this.pincode = employeeDetails.pincode || '';
        this.qualification = employeeDetails.qualification || '';
        this.state = employeeDetails.state || '';
        this.userRoleId = employeeDetails.userRoleId || 0;
        this.experinces = employeeDetails.experinces || '';
        this.salary = employeeDetails.salary || 0;
        this.shiftId = employeeDetails.shiftId || 0;


    }
}