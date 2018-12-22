import { Component, OnInit, Input } from '@angular/core';
import { menus } from './menu-element';
import { UserService } from '../../user.service';

@Component({
  selector: 'cdk-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    @Input() iconOnly:boolean = false;
    public menus = menus;
    photoURL:string;

    constructor(public userService: UserService) { }

    ngOnInit() {
      this.photoURL = this.userService.getUserImg();  
    }


}
