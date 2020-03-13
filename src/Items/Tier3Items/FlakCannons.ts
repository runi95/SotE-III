import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { AdvancedCannon } from '../Tier2Items/AdvancedCannon';

const itemId: number = FourCC('I04H');
const name: string = 'Flak Cannons';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE, ItemLabel.SPLASH];
const goldCost: number = 24000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNFlakCannons.blp';
const description: string = `Makes sure there's nothing left of your opponents

|cffffcc00Passive:|r Splash radius is increased by +100
|cffffcc00Attack damage:|r +400
|cffffcc00Splash:|r +100%

|cFF808080Splash determines how much of the original physical damage splashes to nearby units.|r`;

export class FlakCannons extends ItemRecipe {
    constructor(advancedCannon: AdvancedCannon) {
        super(itemId, name, labels, goldCost, iconPath, description, [advancedCannon]);
    }
}
