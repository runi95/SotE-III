import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { BalancedShield } from '../Tier1Items/BalancedShield';
import { SkullShield } from '../Tier1Items/SkullShield';

const itemId: number = FourCC('I03Y');
const name: string = 'Stone Armor';
const labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.RESISTANCE, ItemLabel.THORNS, ItemLabel.REFLECT];
const goldCost: number = 11280;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNStoneForm.blp';
const description: string = `Don't touch, pointy.

|cffffcc00Reflect:|r +40
|cffffcc00Thorns:|r +40
|cffffcc00Block:|r +40
|cffffcc00Resistance:|r +40

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class StoneArmor extends ItemRecipe {
    constructor(balancedShield: BalancedShield, skullShield: SkullShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [balancedShield, skullShield]);
    }
}
