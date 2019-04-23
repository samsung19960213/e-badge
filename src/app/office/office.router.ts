import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

import { OfficeComponent } from "./office.component";
import { DeleteDialogueComponent } from "../delete-dialogue/delete-dialogue.component";
import { DeleteDesignationdialogueComponent } from "../delete-designationdialogue/delete-designationdialogue.component";
import { DeleteLeaveDialogueComponent } from "../delete-leave-dialogue/delete-leave-dialogue.component";
import { DeleteHolidayDialogueComponent } from "../delete-holiday-dialogue/delete-holiday-dialogue.component";
import { DeleteShiftDialogueComponent } from "../delete-shift-dialogue/delete-shift-dialogue.component";
import { DeleteUserDialogueComponent } from "../delete-user-dialogue/delete-user-dialogue.component";






const officeRoutes: Routes = [
 
    { path: '', component: OfficeComponent},
    
  
];

@NgModule({
imports: [
  RouterModule.forChild(officeRoutes)
],
entryComponents: [DeleteDialogueComponent,
  DeleteDesignationdialogueComponent,
  DeleteLeaveDialogueComponent,
  DeleteHolidayDialogueComponent,
  DeleteUserDialogueComponent,
  DeleteShiftDialogueComponent],
exports: [
  RouterModule
]
})
export class OfficeRouterModule {}