import { Injectable } from "@angular/core";

@Injectable()
export class EmployeesService {

employeeid: number;
constructor(){}
setEmployeeId(id: number) {
this.employeeid = id;
}

getEmployeeId() {
    return this.employeeid;
}


}