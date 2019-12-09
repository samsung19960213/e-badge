
import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatProgressBarModule, MatProgressSpinnerModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";


import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AttendanceRouterModule } from "./attendance.router";
import { AbsenteesComponent } from "./absentees/absentees.component";
import { PresentComponent } from "./present/present.component";
import { AttendanceComponent } from "./attendance.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LateComersComponent } from "./late-comers/late-comers.component";
import { CheckoutRequestComponent } from "./checkout-request/checkout-request.component";
import { MonthlyAbsenteesListComponent } from './monthly-absentees-list/monthly-absentees-list.component';
import { WorkFromHomeComponent } from './work-from-home/work-from-home.component';
import { WorkFromHomeDetailsComponent } from './work-from-home-details/work-from-home-details.component';
import { AuthInterceptor } from "../interceptor/fuseHttpInterceptor";
import { ApplyWorkFromHomeComponent } from './apply-work-from-home/apply-work-from-home.component';
import { WorkFromHomeEmpListComponent } from './work-from-home-emp-list/work-from-home-emp-list.component';
import { ImmediateWorkFromHomeComponent } from './immediate-work-from-home/immediate-work-from-home.component';
import { HelperModule } from "../helpers/HelperModule";


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
        AttendanceRouterModule,
        HelperModule
    ],
    declarations: [
        AttendanceComponent,
        AbsenteesComponent,
        PresentComponent,
        LateComersComponent,
        CheckoutRequestComponent,
        MonthlyAbsenteesListComponent,
        WorkFromHomeComponent,
        WorkFromHomeDetailsComponent,
        ApplyWorkFromHomeComponent,
        WorkFromHomeEmpListComponent,
        ImmediateWorkFromHomeComponent
    ],
    exports: [
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ]
})
export class AttendanceModule {
}
