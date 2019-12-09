

import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule, MatRadioGroup, MatRadioButton, MatRadioModule, MatDialog, MatDialogModule, MatDatepicker, MatDatepickerToggle, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatProgressBarModule, MatProgressSpinnerModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LeavesComponent } from "./leaves.component";
import { LeaveListComponent } from "./leave-list/leave-list.component";
import { LeaveDetailsComponent, RejectPopup } from "./leave-details/leave-details.component";
import { LeavesRouterModule } from "./leaves.router";
import { RejectModule } from "./leave-details/reject.module";
import { PendingLeavesComponent } from "./pending-leaves/pending-leaves.component";
import { AuthInterceptor } from "../interceptor/fuseHttpInterceptor";
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { DateFormatPipe } from "../helpers/DateFormatPipe";
import { DateTimeFormatPipe } from "../helpers/DateTimeFormatPipe";
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
        LeavesRouterModule,
        RejectModule,
        HelperModule
    ],
    declarations: [
        LeavesComponent,
        LeaveListComponent,
        LeaveDetailsComponent,
        PendingLeavesComponent,
        ApplyLeaveComponent
    ],
    entryComponents: [RejectPopup],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }

    ]
})
export class LeavesModule {
}
