import { ItemRecipe } from '../ItemRecipe';
import { BloodiedExecutionersAxe } from '../BaseItems/BloodiedExecutionersAxe';
import { ItemLabel } from '../ItemLabel';
import { WarAxe } from '../BaseItems/WarAxe';
import { OrbOfFire } from '../BaseItems/OrbOfFire';

// tslint:disable: max-line-length
const itemId: number = FourCC('I01E');
const name = 'Fiery Blood Axe';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.SPLASH, ItemLabel.EXECUTE];
const goldCost = 1500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpThree.blp';
const description = `You can't quite make out what the runes say.

|cffffcc00Strength:|r +10
|cffffcc00Execute:|r +55
|cffffcc00Splash:|r +15%

|cFF808080Splash determines how much of the original physical damage splashes to nearby units.|r`;

export class FieryBloodAxe extends ItemRecipe {
    constructor(warAxe: WarAxe, bloodiedExecutionersAxe: BloodiedExecutionersAxe, orbOfFire: OrbOfFire) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, bloodiedExecutionersAxe, orbOfFire]);
    }
}
