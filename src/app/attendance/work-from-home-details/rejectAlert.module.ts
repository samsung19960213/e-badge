import { MatFormFieldModule, MatButtonModule, MatInputModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RejectAlert } from "./work-from-home-details.component";

const routes = [
    {
        path: './leaves',
        component:RejectAlert
    }
];

@NgModule({
    declarations: [
        RejectAlert,
       
    ],
    imports : [
MatFormFieldModule,FormsModule,MatButtonModule,MatInputModule
    ],

})
export class RejectAlertModule {}