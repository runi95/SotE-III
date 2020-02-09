import { Group } from './Group';

export class GroupInRange extends Group {
    constructor(radius: number, loc: location) {
        super(GetUnitsInRangeOfLocAll(radius, loc));
    }
}
