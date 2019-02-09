
import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";


import { HttpClientModule } from "@angular/common/http";
import { AttendanceRouterModule } from "./attendance.router";
import { AbsenteesComponent } from "./absentees/absentees.component";
import { PresentComponent } from "./present/present.component";
import { AttendanceComponent } from "./attendance.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LateComersComponent } from "./late-comers/late-comers.component";
import { CheckoutRequestComponent } from "./checkout-request/checkout-request.component";



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
        MatPaginatorModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
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
       
        MatDialogModule,
         MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
		 ReactiveFormsModule,
         FormsModule,
        AttendanceRouterModule
     ],
    declarations: [   
        AttendanceComponent,
       AbsenteesComponent,
       PresentComponent,
       LateComersComponent,
       CheckoutRequestComponent,
    ],
    exports: [
    ],
    providers: [
    ]
})
export class AttendanceModule {
}
