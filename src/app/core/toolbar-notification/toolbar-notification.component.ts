import { Component, OnInit, Input, HostListener, ElementRef, EventEmitter, Output, Host } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { LeaveService } from '../../leaves/leaves.service';
import { Url } from '../../Url';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'cdk-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent implements OnInit {
	cssPrefix = 'toolbar-notification';
    isOpen: boolean = false;
    notilength:number;
  	@Input() notifications = [];

    // @HostListener('document:click', ['$event', '$event.target'])
    // onClick(event: MouseEvent, targetElement: HTMLElement) {
    //     if (!targetElement) {
    //           return;
    //     }
    //     const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    //     if (!clickedInside) {
    //          this.isOpen = false;
    //     }
    // }
  	@Output() delete = new EventEmitter();
//  isOpen: boolean = false;

    constructor(private elementRef: ElementRef,private http: HttpClient, public datePipe: DatePipe,public route: Router,public leaveService:LeaveService) {}
    ngOnInit() {
        this.firstDate();
    }
    onClickedOutside($event){
      if(this.isOpen ==true){
        this.isOpen =false;
      }
    }
    today: number = Date.now();
    // public bufferValue;
  

  	select() {
    	
  	}
    notification0(){
      console.log("HAII");
    this.notilength=0;
    }
  	ondelete(id:number) {
      this.notifications.splice(id,1); }
     
    // onDelete(id){
     
    // this.delete.emit(id);
    // }


    firstDate(): Promise<any> {
      let latest_date =this.datePipe.transform(this.today, 'yyyy-MM-dd');
      return new Promise((resolve, reject) => {
 
    this.http.get(Url.API_URL + 'api/leave/leaverequestlist')
      
        .subscribe((response: any) => {
       
         this.notifications=response;
          console.log(this.notifications);
          resolve(this.notifications);
          this.notilength = this.notifications.length;
        },reject);
      
      });
    }

    leaveRoute(id:number) {
          
      this.leaveService.setLeaveId(id);
      this.route.navigateByUrl('auth/leaves/leave-details');
      
    }
}
