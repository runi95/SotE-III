import { ItemRecipe } from '../ItemRecipe';
import { MoonArmor } from '../BasicItems/MoonArmor';
import { IronShield } from '../BasicItems/IronShield';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I028');
const name: string = 'Balanced Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost: number = 1016;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDefendStop.blp';
const description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Block:|r +8
|cffffcc00Resistance:|r +8

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class BalancedShield extends ItemRecipe {
    constructor(moonArmor: MoonArmor, ironShield: IronShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [moonArmor, ironShield]);
    }
}
