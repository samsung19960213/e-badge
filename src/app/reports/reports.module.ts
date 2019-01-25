

import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";
import { MatChipsModule, MatListModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonToggleModule, MatButtonModule, MatCardModule, MatTable, MatHeaderCell, MatCell, MatTableModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatTabsModule, MatRadioGroup, MatRadioButton, MatRadioModule, MatDialog, MatDialogModule, MatDatepicker, MatDatepickerToggle, MatDatepickerModule, MatNativeDateModule, MatSortModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { ReportsComponent } from "./reports.component";
import { ReportsRouterModule } from "./reports.router";
import { PersonalReportsComponent } from "./personal-reports/personal-reports.component";



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
        MatSortModule,
        MatPaginatorModule,
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
         ReportsRouterModule,
        
        
     ],
    declarations: [   
ReportsComponent,
PersonalReportsComponent,
       
    ],
   
    exports: [
    ],
    providers: [
        
    ]
})
export class ReportsModule {
}
