import { ItemRecipe } from '../ItemRecipe';
import { GoblinBattery } from '../BaseItems/GoblinBattery';
import { ItemLabel } from '../ItemLabel';
import { OrbOfLightning } from '../BaseItems/OrbOfLightning';

// tslint:disable: max-line-length
const itemId: number = FourCC('I01Q');
const name = 'Lightning Bolt';
const labels: ItemLabel[] = [];
const goldCost = 1850;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNPurge.blp';
const description = `A lightning bolt capable of devastating damage.

|cffffcc00Use:|r Sends a lightning bolt down at the target location, dealing 2200 damage to enemy units in the center of the target area after 0.6 seconds.
|cffffcc00Mana cost:|r 150
|cffffcc00Range:|r 1000
|cffffcc00Area of effect:|r 400
|cffffcc00Cooldown:|r 30

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class LightningBolt extends ItemRecipe {
    constructor(goblinBattery: GoblinBattery, orbOfLightning: OrbOfLightning) {
        super(itemId, name, labels, goldCost, iconPath, description, [goblinBattery, orbOfLightning]);
    }
}
