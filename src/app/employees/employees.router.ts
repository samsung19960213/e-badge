import { RouterModule, Routes } from "@angular/router";
import { AddEmployeesComponent } from "./add-employees/add-employees.component";
import { NgModule } from "@angular/core";
import { EmployeesComponent } from "./employees.component";
import { EmployeesTableComponent } from "./employees-table/employees-table.component";
import { ActiveEmployeesComponent } from "./active-employees/active-employees.component";
import { DeactivatedEmployeesComponent } from "./deactivated-employees/deactivated-employees.component";





const employeesRoutes: Routes = [
    { path: 'add-employees', component:  AddEmployeesComponent},
    {path: 'employee-table', component: EmployeesTableComponent},
    {path: 'active-employees',component: ActiveEmployeesComponent},
    {path: 'deactivated-employees', component: DeactivatedEmployeesComponent},
    { path: '', component: EmployeesComponent},
  
];

@NgModule({
imports: [
  RouterModule.forChild(employeesRoutes)
],
exports: [
  RouterModule
]
})
export class EmployeesRouterModule {}