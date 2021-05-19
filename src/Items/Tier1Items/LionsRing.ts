import { ItemRecipe } from '../ItemRecipe';
import { RunedBracers } from '../BaseItems/RunedBracers';
import { MoonArmor } from '../BaseItems/MoonArmor';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01L');
const name = 'Lions Ring';
const labels: ItemLabel[] = [ItemLabel.RESISTANCE];
const goldCost = 2040;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNRingLionHead.blp';
const description = `Lion's ring is known to protect it's wearers from magic attacks.

|cffffcc00Resistance:|r +24
|cffffcc00Effect (1):|r Increases item charges whenever you take spell damage.
|cffffcc00Effect (2):|r Releases a chain lightning whenever you reach over 100 charges
|cffffcc00Chain Lightning Damage:|r 300
|cffffcc00Chain Lightning Max Bounce:|r 5

|cFF808080Incoming spell damage is reduced by the amount of resistance you have.|r`;

export class LionsRing extends ItemRecipe {
    constructor(runedBracers: RunedBracers, moonArmor: MoonArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [runedBracers, moonArmor]);
    }
}
