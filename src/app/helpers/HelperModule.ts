import { NgModule } from "@angular/core";
import { DateFormatPipe } from "../helpers/DateFormatPipe";
import { DateTimeFormatPipe } from "../helpers/DateTimeFormatPipe";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from "./Constants";


@NgModule({
    imports: [],
    declarations: [DateFormatPipe, DateTimeFormatPipe],
    entryComponents: [],
    exports: [DateFormatPipe, DateTimeFormatPipe],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
    ]
})
export class HelperModule {
}
