import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { LoadedCannon } from '../Tier1Items/LoadedCannon';

const itemId: number = FourCC('I04E');
const name: string = 'Advanced Cannon';
const labels: ItemLabel[] = [ItemLabel.SPLASH, ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 10250;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPendantOfMana.blp';
const description: string = `Makes sure there's nothing left of your opponents

|cffffcc00Attack damage:|r +125
|cffffcc00Splash:|r +100%

|cFF808080Splash determines how much of the original physical damage splashes to nearby units.|r`;

export class AdvancedCannon extends ItemRecipe {
    constructor(loadedCannon: LoadedCannon) {
        super(itemId, name, labels, goldCost, iconPath, description, [loadedCannon]);
    }
}
