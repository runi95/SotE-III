import { ItemRecipe } from '../ItemRecipe';
import { BalancedShield } from './BalancedShield';
import { ItemLabel } from '../ItemLabel';
import { IronShield } from '../BasicItems/IronShield';
import { MoonArmor } from '../BasicItems/MoonArmor';

const itemId: number = FourCC('I02B');
const name: string = 'Improved Balanced Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost: number = 2540;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDefend.blp';
const description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Block:|r +20
|cffffcc00Resistance:|r +20

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class ImprovedBalancedShield extends ItemRecipe {
    constructor(balancedShield: BalancedShield, ironShield: IronShield, moonArmor: MoonArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [balancedShield, ironShield, moonArmor]);
    }
}
