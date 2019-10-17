import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAccountsComponent } from './dashboard-accounts.component';
import { RouterModule, Routes } from '@angular/router'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/fuseHttpInterceptor';

export const appRoutes: Routes = [
    { path: '', component: DashboardAccountsComponent },
]

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [DashboardAccountsComponent],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}]
})
export class DashboardAccountsModule { }
