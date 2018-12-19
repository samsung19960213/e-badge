import { RouterModule, Routes } from "@angular/router";
import { AddEmployeesComponent } from "./add-employees/add-employees.component";
import { NgModule } from "@angular/core";
import { EmployeesComponent } from "./employees.component";





const employeesRoutes: Routes = [
    { path: 'add-employees', component:  AddEmployeesComponent},
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