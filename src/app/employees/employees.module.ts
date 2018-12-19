import { AddEmployeesComponent } from "./add-employees/add-employees.component";
import { EmployeesRouterModule } from "./employees.router";
import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTabsModule, MatSelectModule, MatOption, MatOptionModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployeesComponent } from "./employees.component";
import { appRoutes } from "../dashboard-accounts/dashboard-accounts.module";
// import { FormsRouterModule } from "../forms/forms.router";
// import { ReactiveFormsModule, FormsModule } from "@angular/forms";


@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
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
		//  ReactiveFormsModule,
		//  FormsModule,
        EmployeesRouterModule
     ],
    declarations: [   
        AddEmployeesComponent,
        EmployeesComponent
    ],
    exports: [
    ],
    providers: [
    ]
})
export class EmployeesModule {
}
