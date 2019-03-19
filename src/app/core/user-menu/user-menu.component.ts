import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cdk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;
name:string;
  	//currentUser = null;
Aaqil;
  	

  	@Input() currentUser = null;
  	@HostListener('document:click', ['$event', '$event.target'])
  	onClick(event: MouseEvent, targetElement: HTMLElement) {
    	if (!targetElement) {
     		return;
    	}

    	const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    	if (!clickedInside) {
      		this.isOpen = false;
    	}
  	}
  	
    
  	constructor(private elementRef: ElementRef, public userService: UserService,private route: Router) { }


  	ngOnInit() {
		this.currentUser.currentUserName=this.userService.getUserName();
		this.currentUser.photoURL = this.userService.getUserImg();  
  	}
logout() {
	this.route.navigateByUrl('/login');
}
}
