import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { EmptyVial } from '../BaseItems/EmptyVial';
import { LifeStone } from '../BaseItems/LifeStone';
import { Scepter } from '../BaseItems/Scepter';

const itemId: number = FourCC('I057');
const name = 'Wand of Reanimation';
const labels: ItemLabel[] = [ItemLabel.RESTORATION, ItemLabel.MAX_MANA];
const goldCost = 1380;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNWandSkull.blp';
const description = `A very dangerous weapon in the wrong hands.

|cffffcc00Max mana:|r +120
|cffffcc00Restoration:|r +120%

|cFF808080Mana regeneration determines how much mana you're passively regaining every second.|r`;

export class WandOfReanimation extends ItemRecipe {
    constructor(emptyVial: EmptyVial, lifeStone: LifeStone, scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [emptyVial, lifeStone, scepter]);
    }
}
