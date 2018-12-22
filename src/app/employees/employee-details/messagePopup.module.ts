import { MessagePopup } from "./employee-details.component";
import { NgModule } from "@angular/core";

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

    ],

})
export class MessagePopupModule {


    
}