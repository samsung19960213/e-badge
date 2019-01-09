import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { AbsenteesComponent } from "./absentees/absentees.component";
import { AttendanceComponent } from "./attendance.component";
import { PresentComponent } from "./present/present.component";
import { LateComersComponent } from "./late-comers/late-comers.component";






const attendanceRoutes: Routes = [
    { path: 'absentees', component:  AbsenteesComponent},
    { path: 'present', component:  PresentComponent},
    {path: 'late-comers', component: LateComersComponent},
    {path:'' , component: AttendanceComponent}
 
  
];

@NgModule({
imports: [
  RouterModule.forChild(attendanceRoutes)
],
exports: [
  RouterModule
]
})
export class AttendanceRouterModule {}