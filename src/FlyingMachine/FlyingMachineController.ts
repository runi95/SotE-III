import { Travel } from './Travel';
import { Centaurs } from './Centaurs';
import { Beetles } from './Beetles';
import { Druids } from './Druids';
import { Murlocs } from './Murlocs';
import { Revenants } from './Revenants';
import { FelBeasts } from './FelBeasts';
import { Satyrs } from './Satyrs';
import { Ghouls } from './Ghouls';
import { CrystalArachnathids } from './CrystalArachnathids';
import { Necromancers } from './Necromancers';
import { CenterShop } from './CenterShop';

export class FlyingMachineController {
    private readonly travelLocations: Travel[];

    constructor() {
        this.travelLocations = [
            new Beetles(),
            new Druids(),
            new Centaurs(),
            new Murlocs(),
            new Revenants(),
            new Necromancers(),
            new FelBeasts(),
            new Satyrs(),
            new Ghouls(),
            new CrystalArachnathids(),
            new CenterShop(),
        ];
    }
}
