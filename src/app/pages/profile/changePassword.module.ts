import { NgModule } from "@angular/core";
import { ChangePassword } from "./profile.component";
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


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