import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BaseItems/WarAxe';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I023');
const name = 'Maul of Strength';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.MAX_HEALTH];
const goldCost = 1460;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNHammer.blp';
const description = `A heavy maul only wielded by the strongest of heroes.

|cffffcc00Strength:|r +11
|cffffcc00Max health:|r +200
|cffffcc00Effect(1):|r Taking damage increases item charges by 1 (max 15 charges) for 5 seconds
|cffffcc00Effect(2):|r Physical damage dealt is increased by 5 for each item stack

|cFF808080Strength increases your max health and health regen.|r`;

export class MaulOfStrength extends ItemRecipe {
    constructor(warAxe: WarAxe, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, studdedLeatherArmor]);
    }
}
