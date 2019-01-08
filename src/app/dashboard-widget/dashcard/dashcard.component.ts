import { Component, OnInit ,Input } from '@angular/core';
import { Observable ,  Observer } from 'rxjs';
import { Router } from '@angular/router';
@Component({
    selector: 'cdk-dashcard',
    templateUrl: './dashcard.component.html',
    styleUrls: ['./dashcard.component.scss']
})
export class DashcardComponent implements OnInit {
     
    @Input() dashData: any;
    
    constructor(public router:Router) {

     }

    ngOnInit() {
    }
route(link:string){
    this.router.navigateByUrl(link);
}
}
