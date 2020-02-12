import { ItemRecipe } from '../ItemRecipe';
import { ImprovedMoonArmor } from './ImprovedMoonArmor';
import { ImprovedBalancedShield } from './ImprovedBalancedShield';
import { ReinforcedScales } from './ReinforcedScales';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02D');
const name: string = 'Advanced Reinforced Hides';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH, ItemLabel.HEALTH_REGEN, ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost: number = 7915;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAdvancedReinforcedHides.blp';
const description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Health:|r +200
|cffffcc00Health regen:|r +20
|cffffcc00Block:|r +45
|cffffcc00Resistance:|r +45

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class AdvancedReinforcedHides extends ItemRecipe {
    constructor(improvedMoonArmor: ImprovedMoonArmor, improvedBalancedShield: ImprovedBalancedShield, reinforcedScales: ReinforcedScales) {
        super(itemId, name, labels, goldCost, iconPath, description, [improvedMoonArmor, improvedBalancedShield, reinforcedScales]);
    }
}
