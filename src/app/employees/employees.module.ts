import { AddEmployeesComponent } from "./add-employees/add-employees.component";
import { EmployeesRouterModule } from "./employees.router";
import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule, MatRadioGroup, MatRadioButton, MatRadioModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployeesComponent } from "./employees.component";
import { appRoutes } from "../dashboard-accounts/dashboard-accounts.module";
import { EmployeesTableComponent } from "./employees-table/employees-table.component";
import { HttpClientModule } from "@angular/common/http";
import { ActiveEmployeesComponent } from "./active-employees/active-employees.component";
import { DeactivatedEmployeesComponent } from './deactivated-employees/deactivated-employees.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


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
        CommonModule,
		// FormsRouterModule,
		FlexLayoutModule,
		MatButtonModule,
		MatToolbarModule,
		MatCardModule,
		MatTabsModule,
		MatIconModule,
         MatInputModule,
         MatPaginatorModule,
		//  ReactiveFormsModule,
		//  FormsModule,
        EmployeesRouterModule
     ],
    declarations: [   
        AddEmployeesComponent,
        EmployeesComponent,
        EmployeesTableComponent,
        ActiveEmployeesComponent,
        DeactivatedEmployeesComponent
    ],
    exports: [
    ],
    providers: [
    ]
})
export class EmployeesModule {
}
