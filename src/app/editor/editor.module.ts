import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditorComponent } from './editor.component';
import { CoreModule } from '../core/core.module';
import { Routes, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/fuseHttpInterceptor';

const routes: Routes = [
    {path: 'editor', component: EditorComponent ,data: { animation: 'editor' }},
  ];
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        CoreModule,
        QuillModule,
        RouterModule.forChild(routes)
    ],
    declarations: [   
        EditorComponent,
    ],
    exports: [
        RouterModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ]
})
export class EditorModule {
}
