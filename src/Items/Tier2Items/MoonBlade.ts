import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ImprovedMoonArmor } from '../Tier1Items/ImprovedMoonArmor';
import { IronSword } from '../BaseItems/IronSword';

const itemId: number = FourCC('I051');
const name = 'Moon Blade';
const labels: ItemLabel[] = [ItemLabel.SPLASH, ItemLabel.ATTACK_DAMAGE];
const goldCost = 1725;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNMoonBlade.dds';
const description = `A normal sword infused with a special kind of moon armor.

|cffffcc00Attack damage:|r +25
|cffffcc00Resistance:|r +20
|cffffcc00Unique:|r Physical attacks temporarily increases resistance by +5 (up to 50)

|cFF808080Incoming spell damage is reduced by the amount of resistance you have.|r`;

export class MoonBlade extends ItemRecipe {
    constructor(improvedMoonArmor: ImprovedMoonArmor, ironSword: IronSword) {
        super(itemId, name, labels, goldCost, iconPath, description, [improvedMoonArmor, ironSword]);
    }
}
