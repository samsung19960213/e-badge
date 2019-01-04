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
    public proj;
    constructor(public userService: UserService) { }

    ngOnInit() {
      this.username = this.userService.getUserName();
   
      this.photoURL = this.userService.getUserImg();  
    }

}
