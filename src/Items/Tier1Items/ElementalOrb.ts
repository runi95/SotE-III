import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfFire } from '../BaseItems/OrbOfFire';
import { OrbOfLightning } from '../BaseItems/OrbOfLightning';

const itemId: number = FourCC('I03W');
const name = 'Elemental Orb';
const labels: ItemLabel[] = [ItemLabel.SPLASH];
const goldCost = 2400;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNMixedOrb.dds';
const description = `The perfect storm.

|cffffcc00Splash:|r +35%
|cffffcc00Passive:|r Attacked enemies are slowed by 20% for 2 seconds.

|cFF808080Splash determines how much of the original physical damage splashes to nearby units.|r`;

export class ElementalOrb extends ItemRecipe {
    constructor(orbOfFire: OrbOfFire, orbOfLightning: OrbOfLightning) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfFire, orbOfLightning]);
    }
}
