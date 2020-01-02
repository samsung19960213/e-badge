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
        MatFormFieldModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
       } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRouterModule } from './pages.routes';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CoreModule } from '../core/core.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/fuseHttpInterceptor';
import { HolidaysComponent } from './holidays/holidays.component';

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
        MatDatepickerModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        MatInputModule,
        MatDialogModule,
        CoreModule,
        PagesRouterModule ],
    declarations: [   
        ContactComponent,
        AboutComponent,
        ServicesComponent,
        ProfileComponent,
        HolidaysComponent
    ],
    exports: [
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ]
})
export class PagesModule {
}
