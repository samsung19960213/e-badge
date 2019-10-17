import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCrmComponent } from './dashboard-crm.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';
import { AgmCoreModule } from '@agm/core';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import { highlightJsFactory } from '../material-widgets/material-widgets.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/fuseHttpInterceptor';

export const appRoutes: Routes = [
    { path: '', component: DashboardCrmComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FlexLayoutModule,
    MatCardModule,
    DashboardWidgetModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXTJwhYqJ6Pc7VXGRMTv40N1WRLqzuSNs'
    }),
    HighlightJsModule.forRoot({
      provide: HIGHLIGHT_JS,
      useFactory: highlightJsFactory
    }),
  ],
  declarations: [DashboardCrmComponent],
  exports: [ ],
  providers : [{
    provide: HTTP_INTERCEPTORS,    
    useClass: AuthInterceptor,
    multi: true,
}]
})
export class DashboardCrmModule { }
