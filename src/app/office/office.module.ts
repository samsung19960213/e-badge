

import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule, MatRadioGroup, MatRadioButton, MatRadioModule, MatDialog, MatDialogModule, MatDatepicker, MatDatepickerToggle, MatDatepickerModule, MatNativeDateModule, MatStepperModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { OfficeComponent } from "./office.component";
import { OfficeRouterModule } from "./office.router";
import { DeleteDialogueComponent } from "../delete-dialogue/delete-dialogue.component";
import { DeleteDesignationdialogueComponent } from "../delete-designationdialogue/delete-designationdialogue.component";
import { DeleteHolidayDialogueComponent } from "../delete-holiday-dialogue/delete-holiday-dialogue.component";
import { DeleteShiftDialogueComponent } from "../delete-shift-dialogue/delete-shift-dialogue.component";
import { DeleteLeaveDialogueComponent } from "../delete-leave-dialogue/delete-leave-dialogue.component";
import { DeleteUserDialogueComponent } from "../delete-user-dialogue/delete-user-dialogue.component";



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
        OfficeRouterModule,
        MatStepperModule,
        
        
        
     ],
    declarations: [   
 OfficeComponent,
 DeleteDialogueComponent,
 DeleteDesignationdialogueComponent,
 DeleteHolidayDialogueComponent,
 DeleteShiftDialogueComponent,
 DeleteUserDialogueComponent,
 DeleteLeaveDialogueComponent
   
       
    ],
   
    exports: [
    ],
    providers: [
        
    ]
})
export class OfficeModule {
}
