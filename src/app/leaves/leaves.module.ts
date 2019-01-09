

import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule, MatRadioGroup, MatRadioButton, MatRadioModule, MatDialog, MatDialogModule, MatDatepicker, MatDatepickerToggle, MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { LeavesComponent } from "./leaves.component";
import { LeaveListComponent } from "./leave-list/leave-list.component";
import { LeaveDetailsComponent, RejectPopup } from "./leave-details/leave-details.component";
import { LeavesRouterModule } from "./leaves.router";
import { RejectModule } from "./leave-details/reject.module";
import { PendingLeavesComponent } from "./pending-leaves/pending-leaves.component";



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
         LeavesRouterModule,
         RejectModule
        
        
        
     ],
    declarations: [   
    LeavesComponent,
    LeaveListComponent,
    LeaveDetailsComponent,
    PendingLeavesComponent,
   
       
    ],
    entryComponents: [RejectPopup],
    exports: [
    ],
    providers: [
        
    ]
})
export class LeavesModule {
}
