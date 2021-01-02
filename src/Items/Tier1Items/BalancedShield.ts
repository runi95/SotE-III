import { ItemRecipe } from '../ItemRecipe';
import { IronShield } from '../BaseItems/IronShield';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I028');
const name: string = 'Balanced Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost: number = 994;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDefendStop.blp';
const description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Block:|r +18
|cffffcc00Max health:|r +100

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class BalancedShield extends ItemRecipe {
    constructor(ironShield: IronShield, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironShield, studdedLeatherArmor]);
    }
}
