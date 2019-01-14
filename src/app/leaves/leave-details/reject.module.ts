import { NgModule } from "@angular/core";
import { RejectPopup } from "./leave-details.component";
import { MatFormFieldModule, MatButtonModule, MatInputModule } from "@angular/material";
import { FormsModule } from "@angular/forms";

const routes = [
    {
        path: './leaves',
        component:RejectPopup
    }
];

@NgModule({
    declarations: [
        RejectPopup,
       
    ],
    imports : [
MatFormFieldModule,FormsModule,MatButtonModule,MatInputModule
    ],

})
export class RejectModule {


    
}