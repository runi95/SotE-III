import { ItemRecipe } from '../ItemRecipe';
import { BalancedShield } from '../Tier1Items/BalancedShield';
import { ItemLabel } from '../ItemLabel';
import { SteelShield } from '../Tier1Items/SteelShield';
import { ImprovedMoonArmor } from '../Tier1Items/ImprovedMoonArmor';

const itemId: number = FourCC('I02B');
const name: string = 'Improved Balanced Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost: number = 3810;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDefend.blp';
const description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Block:|r +30
|cffffcc00Resistance:|r +30

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class ImprovedBalancedShield extends ItemRecipe {
    constructor(balancedShield: BalancedShield, steelShield: SteelShield, improvedMoonArmor: ImprovedMoonArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [balancedShield, steelShield, improvedMoonArmor]);
    }
}
