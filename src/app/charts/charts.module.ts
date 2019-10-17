import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { Routes, RouterModule } from '@angular/router';
import { ChartsRouterModule } from './charts.router';

import { ChartjsModule } from './chartjs/chartjs.module';
import { NgxChartModule } from './ngx-charts/ngx-charts.module';
import { Nvd3ChartsModule } from './nvd3-charts/nvd3-charts.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/fuseHttpInterceptor';


@NgModule({
  imports: [
    CommonModule,
    ChartsRouterModule,
    NgxChartModule,
    FlexLayoutModule,
    ChartjsModule,
    Nvd3ChartsModule
  ],
  declarations: [],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}]
})
export class ChartsModule { }
