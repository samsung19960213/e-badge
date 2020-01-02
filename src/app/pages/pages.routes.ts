import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ProfileComponent } from './profile/profile.component';
import { HolidaysComponent } from './holidays/holidays.component';

const pagesRoutes: Routes = [
  { path: 'contact', component: ContactComponent, data: { animation: 'contact' } },
  { path: 'about', component: AboutComponent, data: { animation: 'about' } },
  { path: 'services', component: ServicesComponent, data: { animation: 'services' } },
  { path: 'holidays', component: HolidaysComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRouterModule { }