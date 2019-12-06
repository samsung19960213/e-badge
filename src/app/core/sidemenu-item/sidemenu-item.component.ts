import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
    selector: 'cdk-sidemenu-item',
    templateUrl: './sidemenu-item.component.html',
    styleUrls: ['./sidemenu-item.component.scss']
})
export class SidemenuItemComponent implements OnInit {

    @Input() menu;
    @Input() iconOnly: boolean;
    @Input() secondaryMenu = false;
    userId:number=1;

    constructor(public userService: UserService) { }

    ngOnInit() {
        this.userId=this.userService.userroleId;
        // if(this.userService.userroleId==1){
        //     this.userId=1;
        // }else if(this.userService.userroleId==2){
        //     this.userId=3;
        // }
        // else{
        //     this.userId=2;
        // }
    }
    // mainMenu(){
    //    for ( var i=0;i <this.menu.user.length;i++){
    //        if(this.menu.link==false && this.userId==this.menu.user[i])
    //             return true;
    //    }
    // }

    // subMenu(){
    //     for ( var i=0;i <this.menu.user.length;i++){
    //         if(this.menu.link!=false && this.userId==this.menu.user[i])
    //              return true;
    //     }
    //  }

    openLink() {
        this.menu.open = this.menu.open;
    }

    chechForChildMenu() {
        return (this.menu && this.menu.sub) ? true : false;
    }

}
