import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

import { OfficeComponent } from "./office.component";






const officeRoutes: Routes = [
 
    { path: '', component: OfficeComponent},
    
  
];

@NgModule({
imports: [
  RouterModule.forChild(officeRoutes)
],
exports: [
  RouterModule
]
})
export class OfficeRouterModule {}