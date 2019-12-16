import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { AbsenteesComponent } from "./absentees/absentees.component";
import { AttendanceComponent } from "./attendance.component";
import { PresentComponent } from "./present/present.component";
import { LateComersComponent } from "./late-comers/late-comers.component";
import { CheckoutRequestComponent } from "./checkout-request/checkout-request.component";
import { MonthlyAbsenteesListComponent } from "./monthly-absentees-list/monthly-absentees-list.component";
import { WorkFromHomeDetailsComponent } from "./work-from-home-details/work-from-home-details.component";
import { WorkFromHomeComponent } from "./work-from-home/work-from-home.component";
import { ApplyWorkFromHomeComponent } from "./apply-work-from-home/apply-work-from-home.component";
import { WorkFromHomeEmpListComponent } from "./work-from-home-emp-list/work-from-home-emp-list.component";
import { ImmediateWorkFromHomeComponent } from "./immediate-work-from-home/immediate-work-from-home.component";







const attendanceRoutes: Routes = [
  { path: 'work-from-home-details', component: WorkFromHomeDetailsComponent },
  { path: 'work-from-home', component: WorkFromHomeComponent },
  { path: 'monthly-absentees', component: MonthlyAbsenteesListComponent },
  { path: 'absentees', component: AbsenteesComponent },
  { path: 'present', component: PresentComponent },
  { path: 'late-comers', component: LateComersComponent },
  { path: 'checkout-request', component: CheckoutRequestComponent },
  { path: 'apply-wfh', component: ApplyWorkFromHomeComponent },
  { path: 'emp/work-from-home', component: WorkFromHomeEmpListComponent },
  { path: 'immediate/work-from-home', component: ImmediateWorkFromHomeComponent },
  { path: '', component: AttendanceComponent },


];

@NgModule({
  imports: [
    RouterModule.forChild(attendanceRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AttendanceRouterModule { }