import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

username: string; 
userImg: string;
userId:number;
userPassword:string;
userEmail:string;
Department:string;
Designation:string;
EmployeeID:number;
Lname:string;
constructor(){}
setUserinfo(username:string , userImg:string,userId:number,
    userPassword:string,
    userEmail:string,department: string,designation:string,employeeId:number,lname:string) {
this.username = username;
console.log(this.username);
console.log(this.userImg);
this.userImg=userImg;
this.userId=userId;
this.userPassword=userPassword;
this.userEmail=userEmail;
this.Department=department;
this.Designation=designation;
this.EmployeeID=employeeId;
this.Lname=lname;
}

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
getuserDesignation(){
    return this.Designation;

}
getEmployeeID(){
    return this.EmployeeID;

}
getLastName(){
    return this.Lname;
}
}