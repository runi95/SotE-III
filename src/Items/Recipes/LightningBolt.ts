import { ItemRecipe } from '../ItemRecipe';
import { GoblinBattery } from '../BasicItems/GoblinBattery';
import { ItemLabel } from '../ItemLabel';
import { OrbOfLightning } from '../BasicItems/OrbOfLightning';

// tslint:disable: max-line-length
const itemId: number = FourCC('I01Q');
const name: string = 'Lightning Bolt';
const labels: ItemLabel[] = [];
const goldCost: number = 1850;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPurge.blp';
const description: string = `A lightning bolt capable of devastating damage.

|cffffcc00Use:|r Sends a lightning bolt down at the target location, dealing 2200 damage to enemy units in the center of the target area after 0.6 seconds.
|cffffcc00Mana Cost:|r 150
|cffffcc00Range:|r 1000
|cffffcc00Area of Effect:|r 400
|cffffcc00Cooldown:|r 30

|cFF808080Use is an effects that occurs when an item is used by clicking on it.|r`;

export class LightningBolt extends ItemRecipe {
    constructor(goblinBattery: GoblinBattery, orbOfLightning: OrbOfLightning) {
        super(itemId, name, labels, goldCost, iconPath, description, [goblinBattery, orbOfLightning]);
    }
}
