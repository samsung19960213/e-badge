import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

username: string; 
userImg: string;
userId:number;
userPassword:string;
userEmail:string;
constructor(){}
setUserinfo(username:string , userImg:string,userId:number,
    userPassword:string,
    userEmail:string) {
this.username = username;
console.log(this.username);
console.log(this.userImg);
this.userImg=userImg;
this.userId=userId;
this.userPassword=userPassword;
this.userEmail=userEmail;
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
}