

import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule, MatRadioGroup, MatRadioButton, MatRadioModule, MatDialog, MatDialogModule, MatDatepicker, MatDatepickerToggle, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatProgressBarModule, MatProgressSpinnerModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { ReportsComponent } from "./reports.component";
import { ReportsRouterModule } from "./reports.router";
import { PersonalReportsComponent } from "./personal-reports/personal-reports.component";
import { LeaveReportsComponent } from "./leave-reports/leave-reports.component";
import { ExcelService } from "./excel.service";

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AuthInterceptor } from "../interceptor/fuseHttpInterceptor";


@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatTableModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatPaginatorModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        HttpClientModule,
        CoreModule,
        MatSortModule,
        MatPaginatorModule,
        CommonModule,
        // FormsRouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,

        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        ReportsRouterModule,
        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
        })
    ],
    declarations: [
        ReportsComponent,
        PersonalReportsComponent,
        LeaveReportsComponent,
    ],
    exports: [],
    providers: [ExcelService,{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }]
})
export class ReportsModule {
}
