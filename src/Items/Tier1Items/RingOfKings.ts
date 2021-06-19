import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BaseItems/WarAxe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfCorruption } from '../BaseItems/OrbOfCorruption';

const itemId: number = FourCC('I055');
const name = 'Ring of Kings';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost = 1000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNRingSkull.blp';
const description = `A royal ring fit for a king

|cffffcc00Strength:|r +10
|cffffcc00Unique:|r Decreases the armor of attacked units by 3

|cFF808080Strength increases your max health and health regen.|r`;

export class RingOfKings extends ItemRecipe {
    constructor(warAxe: WarAxe, orbOfCorruption: OrbOfCorruption) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, orbOfCorruption]);
    }
}
