import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ImpalingBolt } from '../Tier2Items/ImpalingBolt';
import { StrengthOfTheWild } from '../Tier2Items/StrengthOfTheWild';

const itemId: number = FourCC('I04L');
const name: string = 'Mark of the Talon';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 39140;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNEnchantedCrows.blp';
const description: string = `Is it a bird?

|cffffcc00Effect:|r Attacks deal 2% of your current health as bonus damage
|cffffcc00Attack damage:|r +250
|cffffcc00Strength:|r +222

|cFF808080Strength increases your max health and health regen.|r`;

export class MarkOfTheTalon extends ItemRecipe {
    constructor(impalingBolt: ImpalingBolt, strengthOfTheWild: StrengthOfTheWild) {
        super(itemId, name, labels, goldCost, iconPath, description, [impalingBolt, strengthOfTheWild]);
    }
}
