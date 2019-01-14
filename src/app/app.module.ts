import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeesService } from './employees/employees.service';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { UserService } from './user.service';
import { LeaveService } from './leaves/leaves.service';
import { PendingLeavesComponent } from './leaves/pending-leaves/pending-leaves.component';
import { LateComersComponent } from './attendance/late-comers/late-comers.component';
import { OfficeComponent } from './office/office.component';
import { ReportsComponent } from './reports/reports.component';


// import { ReactiveFormsModule, FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    EmployeeFilterPipe,
  


   

   



    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   CommonModule,
    // ReactiveFormsModule,
    // FormsModule,
     LazyLoadModule,
    CoreModule,
    
    BrowserAnimationsModule
  ],
  providers: [EmployeesService, UserService, LeaveService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
