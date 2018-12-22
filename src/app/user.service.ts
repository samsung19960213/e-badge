import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

username: string; 
userImg: string;

constructor(){}
setUserinfo(username:string , userImg:string) {
this.username = username;
console.log(this.username);
console.log(this.userImg);
this.userImg=userImg;
}

getUserImg() {
   return this.userImg;
}
getUserName() {
    return this.username;
}


}