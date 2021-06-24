import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { CrownOfKings } from '../Tier1Items/CrownOfKings';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I05C');
const name = 'Helm of Valor';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.MAX_HEALTH, ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost = 3183;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNHelmOfValor.blp';
const description = `A royal crown fit for a king

|cffffcc00Strength:|r +15
|cffffcc00Max health:|r +350
|cffffcc00Block:|r +16
|cffffcc00Resistance:|r +16
|cffffcc00Unique:|r Damage taken is reduced by 3 for every 50 health missing

|cFF808080Strength increases your max health and health regen.|r`;

export class HelmOfValor extends ItemRecipe {
    constructor(crownOfKings: CrownOfKings, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [crownOfKings, studdedLeatherArmor, studdedLeatherArmor]);
    }
}
