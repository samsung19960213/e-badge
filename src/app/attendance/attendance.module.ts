
import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";


import { HttpClientModule } from "@angular/common/http";
import { AttendanceRouterModule } from "./attendance.router";
import { AbsenteesComponent } from "./absentees/absentees.component";
import { PresentComponent } from "./present/present.component";
import { AttendanceComponent } from "./attendance.component";



@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatTableModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        HttpClientModule,
        CoreModule,
        CommonModule,
		// FormsRouterModule,
		FlexLayoutModule,
		MatButtonModule,
		MatToolbarModule,
		MatCardModule,
		MatTabsModule,
		MatIconModule,
         MatInputModule,
         MatPaginatorModule,
		//  ReactiveFormsModule,
		//  FormsModule,
        AttendanceRouterModule
     ],
    declarations: [   
        AttendanceComponent,
       AbsenteesComponent,
       PresentComponent
    ],
    exports: [
    ],
    providers: [
    ]
})
export class AttendanceModule {
}
