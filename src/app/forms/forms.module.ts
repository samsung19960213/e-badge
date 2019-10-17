import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRouterModule } from './forms.router';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { TemplateDrivenFormsComponent } from './template-driven-forms/template-driven-forms.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
			MatButtonModule,
			MatToolbarModule,
			MatCardModule,
			MatTabsModule,
			MatIconModule,} from '@angular/material';
import { MatInputModule } from '@angular/material';
import {  ReactiveFormsModule } from '@angular/forms';

import { FormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/fuseHttpInterceptor';
@NgModule({
	imports: [
		CommonModule,
		FormsRouterModule,
		FlexLayoutModule,
		MatButtonModule,
		MatToolbarModule,
		MatCardModule,
		MatTabsModule,
		MatIconModule,
		 MatInputModule,
		 ReactiveFormsModule,
		 FormsModule
	],
	declarations: [ReactiveFormsComponent, TemplateDrivenFormsComponent],
	providers:[{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true,
	}]
})
export class FormModule { }
