import { NgModule } from "@angular/core";
import { DateFormatPipe } from "../helpers/DateFormatPipe";
import { DateTimeFormatPipe } from "../helpers/DateTimeFormatPipe";

@NgModule({
    imports: [],
    declarations: [DateFormatPipe, DateTimeFormatPipe],
    entryComponents: [],
    exports: [DateFormatPipe, DateTimeFormatPipe],
    providers: []
})
export class HelperModule {
}
