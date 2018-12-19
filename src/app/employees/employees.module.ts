import { AddEmployeesComponent } from "./add-employees/add-employees.component";
import { EmployeesRouterModule } from "./employees.router";
import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployeesComponent } from "./employees.component";
import { appRoutes } from "../dashboard-accounts/dashboard-accounts.module";


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
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        CoreModule,
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
