import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

import { OfficeComponent } from "./office.component";
import { DeleteDialogueComponent } from "../delete-dialogue/delete-dialogue.component";






const officeRoutes: Routes = [
 
    { path: '', component: OfficeComponent},
    
  
];

@NgModule({
imports: [
  RouterModule.forChild(officeRoutes)
],
entryComponents: [DeleteDialogueComponent],
exports: [
  RouterModule
]
})
export class OfficeRouterModule {}