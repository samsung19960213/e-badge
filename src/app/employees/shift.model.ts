export class ShiftDetails{
    endTime: string;
    id: number;
    shiftName: string;
    startTime: string;

    constructor(shiftDetails ?){
        shiftDetails=new ShiftDetails() || {};
        this.id = shiftDetails.id || 0;
        this.shiftName = shiftDetails.shiftName || 0;

    }
}