import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';
import { LoginComponent } from '../login/login.component';
import { EmployeesComponent } from '../employees/employees.component';
import { AddEmployeesComponent } from '../employees/add-employees/add-employees.component';
import { AuthGuard } from '../authGuard';

export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [

        { path: 'dashboard', component: DashboardCrmComponent ,canActivate: [AuthGuard]},
        { path: 'login', component: LoginComponent },
        { path: 'employees', loadChildren: '../employees/employees.module#EmployeesModule',canActivate: [AuthGuard]  },
        { path: 'leaves', loadChildren: '../leaves/leaves.module#LeavesModule' ,canActivate: [AuthGuard] },
        {path: 'reports', loadChildren: '../reports/reports.module#ReportsModule',canActivate: [AuthGuard]},
        { path: 'attendance', loadChildren: '../attendance/attendance.module#AttendanceModule'  ,canActivate: [AuthGuard]},
        {path: 'office', loadChildren: '../office/office.module#OfficeModule',canActivate: [AuthGuard]},
        
         { path: 'material-widgets', loadChildren: '../material-widgets/material-widgets.module#MaterialWidgetsModule' },
        { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
        { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
        { path: 'charts', loadChildren: '../charts/charts.module#ChartsModule' },
        { path: 'chats', loadChildren: '../chats/chat.module#ChatsModule' }, // fix this
        { path: 'mail', loadChildren: '../mail/mail.module#MailModule' }, // fix this
        { path: 'pages', loadChildren: '../pages/pages.module#PagesModule' },
        { path: 'forms', loadChildren: '../forms/forms.module#FormModule' }, //fix this
        { path: 'guarded-routes', loadChildren: '../guarded-routes/guarded-routes.module#GuardedRoutesModule' },
        { path: 'editor', loadChildren: '../editor/editor.module#EditorModule' }, 
        { path: 'scrumboard', loadChildren: '../scrumboard/scrumboard.module#ScrumboardModule' },
    ]
}];
