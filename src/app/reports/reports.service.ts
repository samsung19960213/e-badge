import { Injectable } from "@angular/core";

@Injectable()
export class ReportsService {
name:string;

reportid:number;
constructor(){}
setReportid(id:number){
    this.reportid=id;
}
setName(name:string){
this.name=name;
}
getReportid(){
    return this.reportid;
}
}
