import { ItemRecipe } from '../ItemRecipe';
import { BalancedShield } from './BalancedShield';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02B');
const name: string = 'Improved Balanced Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost: number = 1520;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDefend.blp';
const description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Block:|r +12
|cffffcc00Resistance:|r +12

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class ImprovedBalancedShield extends ItemRecipe {
    constructor(balancedShield: BalancedShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [balancedShield]);
    }
}
