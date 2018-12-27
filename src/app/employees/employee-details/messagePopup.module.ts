import { MessagePopup } from "./employee-details.component";
import { NgModule } from "@angular/core";
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule } from "@angular/material";
import { FormsModule } from "@angular/forms";

const routes = [
    {
        path: './employees/employee-details',
        component: MessagePopup
    }
];

@NgModule({
    declarations: [
        MessagePopup,
    ],
    imports : [
        MatFormFieldModule,FormsModule,MatButtonModule,MatInputModule, MatIconModule
    ],

})
export class MessagePopupModule {


    
}