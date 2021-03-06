import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

    username: string;
    userImg: string;
    userId: number;
    userPassword: string;
    userEmail: string;
    Department: string;
    DepartmentId:number
    Designation: string;
    EmployeeID: number;
    Lname: string;
    userroleId: number;
    companyId:number;
    companyName:string;
    cmpLogoUrl:string;
    firstName:string;
    constructor() { }
    setUserinfo(username: string, userImg: string, userId: number,
        userPassword: string,
        userEmail: string, department: string, designation: string, employeeId: number, lname: string, roleId: number, companyId:number,companyName:string,cmpLogoUrl:string,firstName:string) {
        this.username = username;
        // console.log(this.username);
        // console.log(this.userImg);
        this.userImg = userImg;
        this.userId = userId;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.Department = department;
        // this.DepartmentId = departmentId;
        this.Designation = designation;
        this.EmployeeID = employeeId;
        this.Lname = lname;
        this.userroleId = roleId;
        this.companyId =companyId;
        this.companyName=companyName;
        this.cmpLogoUrl=cmpLogoUrl;
        this.firstName=firstName;
        // this.dateMonth = date;
        // console.log(this.dateMonth);
    }
    // getdepartmentId() {
    //     return this.DepartmentId;
    // }
    getUserImg() {
        return this.userImg;
    }
    getUserName() {
        return this.username;
    }
    getuserId() {
        return this.userId;
    }
    getuserPassword() {
        return this.userPassword;
    }
    getuserEmail() {
        return this.userEmail;
    }
    getuserDepartment() {
        return this.Department;

    }
    getuserDesignation() {
        return this.Designation;

    }
    getEmployeeID() {
        return this.EmployeeID;

    }
    getLastName() {
        return this.Lname;
    }

    getFirstName() {
        return this.firstName;
    }

    getCompanyId(){
        return this.companyId;
    }
    // getDateMonth() {
    //     return this.dateMonth;
    // }
}