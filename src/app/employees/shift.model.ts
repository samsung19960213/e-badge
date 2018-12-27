export class ShiftDetails{
   
    id: number;
    shiftName: string;

    constructor(shiftDetails ?){
        shiftDetails=new ShiftDetails() || {};
        this.id = shiftDetails.id || 0;
        this.shiftName = shiftDetails.shiftName || '';

    }
}