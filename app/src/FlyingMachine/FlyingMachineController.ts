import { Travel } from './Travel';
import { Centaurs } from './Centaurs';

export class FlyingMachineController {
    private readonly travelLocations: Travel[];

    constructor() {
        this.travelLocations = [
            new Centaurs(),
        ];
    }
}
