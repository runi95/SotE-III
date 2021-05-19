import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { ElementalOrb } from '../Tier1Items/ElementalOrb';

const itemId: number = FourCC('I04D');
const name = 'Improved Elemental Orb';
const labels: ItemLabel[] = [ItemLabel.SPLASH];
const goldCost = 6800;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImprovedMixedOrb.dds';
const description = `The perfect storm.

|cffffcc00Splash:|r +95%
|cffffcc00Passive:|r Attacked enemies are slowed by 60% for 2 seconds.

|cFF808080Splash determines how much of the original physical damage splashes to nearby units.|r`;

export class ImprovedElementalOrb extends ItemRecipe {
    constructor(elementalOrb: ElementalOrb) {
        super(itemId, name, labels, goldCost, iconPath, description, [elementalOrb]);
    }
}
