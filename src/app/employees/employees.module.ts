import { AddEmployeesComponent } from "./add-employees/add-employees.component";
import { EmployeesRouterModule } from "./employees.router";
import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule, MatRadioGroup, MatRadioButton, MatRadioModule, MatDialog, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatProgressBarModule, MatProgressSpinnerModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployeesComponent } from "./employees.component";
import { appRoutes } from "../dashboard-accounts/dashboard-accounts.module";
import { EmployeesTableComponent } from "./employees-table/employees-table.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ActiveEmployeesComponent } from "./active-employees/active-employees.component";
import { DeactivatedEmployeesComponent } from './deactivated-employees/deactivated-employees.component';
import { EmployeeDetailsComponent, MessagePopup } from "./employee-details/employee-details.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EmployeesService } from "./employees.service";
import { MessagePopupModule } from "./employee-details/messagePopup.module";
import { AuthInterceptor } from "../interceptor/fuseHttpInterceptor";
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
        MatProgressBarModule,
        MatProgressSpinnerModule,
        CommonModule,
        // FormsRouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        FormsModule,
        EmployeesRouterModule,
        MessagePopupModule,
        HelperModule
    ],
    declarations: [
        AddEmployeesComponent,
        EmployeesComponent,
        EmployeesTableComponent,
        ActiveEmployeesComponent,
        DeactivatedEmployeesComponent,
        EmployeeDetailsComponent,



    ],
    entryComponents: [MessagePopup],
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
export class EmployeesModule {
}
