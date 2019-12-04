import { NgModule } from "@angular/core";
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChangePassword } from "./user-menu.component";


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
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule
    ],

})

export class ChangePasswordModule {

}