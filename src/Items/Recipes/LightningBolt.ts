import { ItemRecipe } from '../ItemRecipe';
import { TheAegis } from './TheAegis';
import { GoblinBattery } from '../BasicItems/GoblinBattery';
import { ItemLabel } from '../ItemLabel';

// tslint:disable: max-line-length
const itemId: number = FourCC('I01Q');
const name: string = 'Lightning Bolt';
const labels: ItemLabel[] = [];
const goldCost: number = 3190;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPurge.blp';
const description: string = `A lightning bolt capable of devastating damage.

|cffffcc00Block:|r +20
|cffffcc00Effect:|r Sends a lightning bolt down at the target location, dealing 2200 damage to enemy units in the center of the target area after 0.6 seconds.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class LightningBolt extends ItemRecipe {
    constructor(goblinBattery: GoblinBattery, theAegis: TheAegis) {
        super(itemId, name, labels, goldCost, iconPath, description, [goblinBattery, theAegis]);
    }
}
