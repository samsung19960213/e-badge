import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { LeavesComponent } from "./leaves.component";
import { LeaveListComponent } from "./leave-list/leave-list.component";
import { LeaveDetailsComponent } from "./leave-details/leave-details.component";
import { PendingLeavesComponent } from "./pending-leaves/pending-leaves.component";
import { ApplyLeaveComponent } from "./apply-leave/apply-leave.component";






const employeesRoutes: Routes = [
 
    { path: '', component: LeavesComponent},
    { path: 'leave-list', component: LeaveListComponent},
    { path: 'leave-details', component: LeaveDetailsComponent},
    {path: 'pending-leaves', component: PendingLeavesComponent},
    {path:'apply-leave',component:ApplyLeaveComponent}
  
];

@NgModule({
imports: [
  RouterModule.forChild(employeesRoutes)
],
exports: [
  RouterModule
]
})
export class LeavesRouterModule {}