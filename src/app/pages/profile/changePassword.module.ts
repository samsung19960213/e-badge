import { NgModule } from "@angular/core";
import { ChangePassword } from "./profile.component";


const routes = [
    {
        path: './pages/profile',
        component: ChangePassword
    }
];

@NgModule({
    declarations: [
      ChangePassword
    ],
    imports : [

    ],

})

export class ChangePasswordModule{

}