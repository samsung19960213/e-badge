import { PipeTransform, Pipe } from '@angular/core';
import { EmployeeDetails } from './employee.model';

@Pipe({
    name:'employeeFilter'
})

export class EmployeeFilterPipe implements PipeTransform{
    transform(dataSource:EmployeeDetails[],searchTerm:string):EmployeeDetails[]{
        if(!dataSource || searchTerm){
            return dataSource;
        }
        return dataSource.filter(dataSource => dataSource.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}