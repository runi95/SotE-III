import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { RingOfKings } from '../Tier1Items/RingOfKings';
import { BeltOfGiantStrength } from '../Tier1Items/BeltOfGiantStrength';

const itemId: number = FourCC('I05D');
const name = 'Greater Ring of Regeneration';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.HEALTH_REGEN];
const goldCost = 2565;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNEnhancedRingSkull.dds';
const description = `A ring that provides the wielder with infinite life or so they say.

|cffffcc00Strength:|r +30
|cffffcc00Health regen:|r +15
|cffffcc00Unique:|r Decreases the armor of attacked units by 3
|cffffcc00Effect(1):|r Increases item charges by 1 every second (max 60 charges)
|cffffcc00Effect(2):|r Taking damage when below 40% of your maximum health while at 60 item charges resets all charges and applies Bloodlust to the wearer
|cffffcc00Attack speed(Bloodlust):|r +40%
|cffffcc00Movement speed(Bloodlust):|r +25%
|cffffcc00Health regen(Bloodlust):|r +25
|cffffcc00Duration(Bloodlust):|r 60

|cFF808080Strength increases your max health and health regen.|r`;

export class GreaterRingOfRegeneration extends ItemRecipe {
    constructor(ringOfKings: RingOfKings, beltOfGiantStrength: BeltOfGiantStrength) {
        super(itemId, name, labels, goldCost, iconPath, description, [ringOfKings, beltOfGiantStrength]);
    }
}
