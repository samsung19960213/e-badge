import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { ReportsComponent } from "./reports.component";
import { PersonalReportsComponent } from "./personal-reports/personal-reports.component";






const reportsRoutes: Routes = [
 
    { path: '', component: ReportsComponent},
    {path:'personal', component: PersonalReportsComponent}
    
  
];

@NgModule({
imports: [
  RouterModule.forChild(reportsRoutes)
],
exports: [
  RouterModule
]
})
export class ReportsRouterModule {}