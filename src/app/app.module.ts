import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeesService } from './employees/employees.service';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { UserService } from './user.service';
import { LeaveService } from './leaves/leaves.service';
import { ReportsService } from './reports/reports.service';
import { AuthGuard } from './authGuard';
import { ExcelService } from './reports/excel.service';
import { DeleteDialogueComponent } from './delete-dialogue/delete-dialogue.component';
import { OfficeService } from './office/office.service';
import { ExportAsModule } from 'ngx-export-as';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AuthInterceptor } from './interceptor/fuseHttpInterceptor';
import { NgxSpinnerModule } from "ngx-spinner";

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
    BrowserAnimationsModule,
    ExportAsModule,
    NgxSpinnerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  // entryComponents: [ExcelService],
  providers: [EmployeesService, UserService, LeaveService, DatePipe, ReportsService, AuthGuard, OfficeService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
