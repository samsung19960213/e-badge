import { Component, OnInit, Input } from '@angular/core';
import { ToolbarHelpers } from './toolbar.helpers';
import { UserService } from '../../user.service';

@Component({
  selector: 'cdk-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
	
  @Input() sidenav;
	@Input() sidebar;
	@Input() drawer;
	@Input() matDrawerShow;
	fullName:string;
	searchOpen: boolean = false;
    toolbarHelpers = ToolbarHelpers;
  	constructor(private userService:UserService) { }

  	ngOnInit() {
		  this.fullName="Wellcome To eBadge : "+this.userService.getFirstName()+" "+ this.userService.getLastName();
  	}

}
