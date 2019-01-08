import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'cdk-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

    public bio =true;
    public skill;
    photoURL:string;
    username:string;
    designation:string;
    Department:string;
    Lname:string;
    public proj;
    constructor(public userService: UserService) { }

    ngOnInit() {
      this.Lname = this.userService.Lname;
      this.username = this.userService.username;
   this.designation =this.userService.Designation;
   this.Department = this.userService.Department;
      this.photoURL = this.userService.userImg;
      
    }

}
