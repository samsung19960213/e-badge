import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule, MatSortModule, MatPaginatorModule } from '@angular/material';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { appRoutes } from './lazyloader.routes';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

import { DashboardCrmModule } from '../dashboard-crm/dashboard-crm.module';

import { CoreModule } from '../core/core.module';
import { LoginModule } from '../login/login.module';
import { EmployeesModule } from '../employees/employees.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { LeavesModule } from '../leaves/leaves.module';
import { OfficeModule } from '../office/office.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        MatToolbarModule,
        DashboardCrmModule,
        LoginModule,
        MatButtonModule,
        MatIconModule,
        MatSortModule,
    MatPaginatorModule,
        MatTabsModule,
        CoreModule,
        MatSidenavModule,
        PerfectScrollbarModule,
        EmployeesModule,
        AttendanceModule,
        LeavesModule,
        OfficeModule
    ],
    declarations: [AuthComponent],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class AuthModule { }
