import { Component, OnInit, Input } from '@angular/core';
import { userMenu,adminMenu,reportingManagerMenu,hrManagerMenu } from './menu-element';
import { UserService } from '../../user.service';

@Component({
  selector: 'cdk-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    @Input() iconOnly:boolean = false;
    public menus ;
    photoURL:string;

    constructor(public userService: UserService) { }

    ngOnInit() {
      if(this.userService.userroleId==1){
            this.menus=adminMenu;
        }else if(this.userService.userroleId==2){
            this.menus=userMenu;
        }
        else if(this.userService.userroleId==3){
            this.menus=reportingManagerMenu;
        }else if(this.userService.userroleId==4){
            this.menus=hrManagerMenu;
        }
      this.photoURL = this.userService.getUserImg();  
    }


}
