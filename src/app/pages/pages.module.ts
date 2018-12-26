import { NgModule } from '@angular/core';
import { 
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatRadioGroup,
        MatSelectModule,
        MatOptionModule,
        MatRadioModule,
        MatDialogModule,
       } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRouterModule } from './pages.routes';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CoreModule } from '../core/core.module';
import { ProfileComponent, ChangePassword } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordModule } from './profile/changePassword.module';

@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,

        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        MatDialogModule,
        ChangePasswordModule,
        CoreModule,
        PagesRouterModule ],
    declarations: [   
        ContactComponent,
        AboutComponent,
        ServicesComponent,
        ProfileComponent
    ],
    entryComponents:[ChangePassword],
    exports: [
    ],
    providers: [
    ]
})
export class PagesModule {
}
