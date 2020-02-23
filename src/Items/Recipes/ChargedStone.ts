import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { ManaStone } from '../Recipes/ManaStone';
import { LifeStone } from '../BasicItems/LifeStone';

const itemId: number = FourCC('I03J');
const name: string = 'Charged Stone';
const labels: ItemLabel[] = [ItemLabel.RESTORATION, ItemLabel.MAX_MANA];
const goldCost: number = 3150;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNChargedStone.dds';
const description: string = `A stone charged with mana and life.

|cffffcc00Max Mana:|r +450
|cffffcc00Restoration:|r +150%

|cFF808080Restoration restores life points based on a percentage of mana used when casting spells.|r`;

export class ChargedStone extends ItemRecipe {
    constructor(manaStone: ManaStone, lifeStone: LifeStone) {
        super(itemId, name, labels, goldCost, iconPath, description, [manaStone, lifeStone]);
    }
}
