import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { EmployeesModule } from './employees/employees.module';
import { GuardedRoutesComponent } from './guarded-routes/guarded-routes.component';
import { EmployeesModule } from './employees/employees.module';




@NgModule({
  declarations: [
    AppComponent,
  
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   CommonModule,
   ReactiveFormsModule,
   FormsModule,
    LazyLoadModule,
    CoreModule,
    
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
